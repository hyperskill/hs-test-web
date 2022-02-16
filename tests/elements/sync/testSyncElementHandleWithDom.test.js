import {StageTest, correct, wrong} from "../../dist/hstest/index.js"
import path from 'path'
import chai from "chai";
import {logPlugin} from "@babel/preset-env/lib/debug.js";
import {element2selector} from "puppeteer-element2selector";
import puppeteerCore from "puppeteer-core";

const pagePath = path.join(import.meta.url, '../index.html')
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

class UnexpectedNavigationTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // this.page.execute(async () => {
        //     const submitButton = document.getElementById("submit-button");
        //     submitButton.click();
        //     // window.location.reload()
        //     const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
        //     await sleep(300);
        //     return correct();
        // }),
        this.node.execute(async () => {
            let el = await this.page.findByClassName("title");
            await this.page.refresh()
            await el.findByClassName("test")
            return correct();
        })
    ];
}

it('test unexpected navigation on interaction with elements', async () => {
    await new UnexpectedNavigationTest().runTests()
}).timeout(30000);
