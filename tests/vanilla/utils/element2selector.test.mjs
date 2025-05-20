import puppeteer from 'puppeteer';
import { element2selector } from '../../../dist/hstest/utils/element2selector.js';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';

chai.use(chaiAsPromised);

describe('element2selector (JS version, full coverage)', function () {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.setContent(`
      <html>
        <body>
          <div id="unique-id">A</div>

          <div id="duplicated">B1</div>
          <div id="duplicated">B2</div>

          <div class="container">
            <span>Item 1</span>
            <span>Item 2</span>
          </div>

          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>

          <div>
            <section>
              <article>
                <p>Deep</p>
              </article>
            </section>
          </div>

          <div data-test="no-id">
            <span class="no-id">Child</span>
          </div>

          <svg>
            <circle cx="50" cy="50" r="40" stroke="black" fill="red" />
          </svg>
        </body>
      </html>
    `);
    });

    it('should return #id if ID is unique', async () => {
        const handle = await page.$('#unique-id');
        const selector = await element2selector(handle);
        expect(selector).to.equal('#unique-id');
    });

    it('should throw error for duplicated id', async () => {
        const handles = await page.$$('[id="duplicated"]');
        await expect(element2selector(handles[0])).to.be.rejectedWith(/duplicated id/i);
    });

    it('should return nth-of-type for siblings with same tag', async () => {
        const handles = await page.$$('.container span');
        const selector = await element2selector(handles[1]);
        expect(selector).to.equal('html > body > div.container > span:nth-of-type(2)');
    });

    it('should generate correct selector for list items', async () => {
        const handles = await page.$$('ul li');
        const selector = await element2selector(handles[2]);
        expect(selector).to.equal('html > body > ul > li:nth-of-type(3)');
    });

    it('should generate full path for deeply nested element', async () => {
        const handle = await page.$('p');
        const selector = await element2selector(handle);
        expect(selector).to.match(/^html > body > div > section > article > p$/);
    });

    it('should work with elements without id or class', async () => {
        const handle = await page.$('[data-test="no-id"] .no-id');
        const selector = await element2selector(handle);
        expect(selector).to.include('span');
    });

    it('should throw on null element', async () => {
        await expect(element2selector(null)).to.be.rejectedWith(/Invalid element/);
    });

    it('should handle dynamically added DOM elements', async () => {
        await page.evaluate(() => {
            const div = document.createElement('div');
            div.className = 'dynamic';
            document.body.appendChild(div);
        });
        const handle = await page.$('.dynamic');
        const selector = await element2selector(handle);
        expect(selector).to.match(/div.dynamic$/);
    });

    it('should support SVG elements', async () => {
        const handle = await page.$('circle');
        const selector = await element2selector(handle);
        expect(selector).to.match(/svg > circle/);
    });
});
