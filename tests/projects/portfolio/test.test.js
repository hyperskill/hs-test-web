const puppeteer = require('puppeteer');
const path = require('path');
// '..' since we're in the hstest/ subdirectory; learner is supposed to have src/index.html
const pagePath = 'file://' + path.resolve(__dirname, './index.html');

const hs = require('hs-test-web');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function stageTest() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args:['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto(pagePath);

    page.on('console', msg => console.log(msg.text()));

    let selector = 'button[class="open-window"]';
    page.evaluate((selector) => document.querySelector(selector).click(), selector);

    await sleep(1000);

    let result = await hs.testPage(page,
        // Test #1 - check if the document has the header
        () => {
            let headers = document.getElementsByTagName('header');

            if (headers === null || headers.length === 0) {
                return hs.wrong('Cannot find the header in the document.');
            } else if (headers.length > 1) {
                return hs.wrong('Found more than one header in the document.');
            }

            return hs.correct();
        },

        // Test #2 - check if the document has at least one <nav> element
        () => {
            let nav = document.getElementsByTagName('nav');

            if (nav === null || nav.length === 0) {
                return hs.wrong('Cannot find the nav element on your web page.');
            }

            return hs.correct();
        },

        // Test #3 - check if the document has the <h1> element
        () => {
            let headings1 = document.getElementsByTagName('h1');

            if (headings1 === null || headings1.length === 0) {
                return hs.wrong('Cannot find h1 element on your web page.');
            }

            let header = headings1[0]
            let title = header.textContent || header.innerText;

            if (!title || title.length === 0) {
                return hs.wrong('Cannot find a text within h1 element');
            }

            return hs.correct();
        },

        // Test #4 - check if the document has the <h1> element
        () => {
            let html = document.getElementsByTagName('html')[0];

            let margin = window.getComputedStyle(html).margin;
            if (margin !== '0px') {
                return hs.wrong('It seems that you have not reset the default margin property');
            }

            let padding = window.getComputedStyle(html).padding;
            if (padding !== '0px') {
                return hs.wrong('It seems that you have not reset the default padding property');
            }

            return hs.correct();
        },

        // Test #5 - check if the document has the <footer> element
        () => {
            let footers = document.getElementsByTagName('footer');

            if (footers === null || footers.length === 0) {
                return hs.wrong('Cannot find the footer in the document.');
            } else if (footers.length > 1) {
                return hs.wrong('Found more than one footer in the document.');
            }

            return hs.correct();
        },

        // Test #6 - check if the document has at least three section elements
        () => {
            let sections = document.getElementsByTagName('section');

            if (sections === null || sections.length < 3) {
                return hs.wrong(`Cannot find tree sections elements. There are only ${sections.length}.`);
            }

            return hs.correct();
        },

        // Test #7 - check the "about me" section
        () => {
            let sections = document.getElementById('about');

            if (sections === null || sections.length < 1) {
                return hs.wrong('Cannot find a section with the "about" id.');
            }

            return hs.correct();
        },

        // Test #8 - check the "portfolio" section
        () => {
            let sections = document.getElementById('portfolio');

            if (sections === null || sections.length < 1) {
                return hs.wrong('Cannot find a section with the "portfolio" id.');
            }

            return hs.correct();
        },

        // Test #9 - check the "contacts" section
        () => {
            let sections = document.getElementById('contacts');

            if (sections === null || sections.length < 1) {
                return hs.wrong('Cannot find a section with the "contacts" id.');
            }

            return hs.correct();
        },

        // Test #10 - check header and footer background colors
        () => {
            function getRealColor(elem) {
                try {
                    while (elem) {
                        let color = window.getComputedStyle(elem).backgroundColor;
                        if (color !== "rgba(0, 0, 0, 0)") {
                            let match = color.match(/^rgba?\((\d+), (\d+), (\d+)(, [\d.]+)?\)$/i);
                            return {
                                red: Number(match[1]),
                                green: Number(match[2]),
                                blue: Number(match[3]),
                                hex: Number(match[1]) * 65536 + Number(match[2]) * 256 + Number(match[3])
                            };
                        }
                        elem = elem.parentElement;
                    }
                } catch (e) {
                    return null;
                }
                return null;
            }

            let headers = document.getElementsByTagName('header');

            if (headers === null || headers.length === 0) {
                return hs.wrong('Cannot find the header in the document.');
            } else if (headers.length > 1) {
                return hs.wrong('Found more than one header in the document.');
            }

            let hasBackgroundImage = getComputedStyle(headers[0]).background.includes('url');

            let headerBack = getRealColor(headers[0]);
            let noCustomHeaderColor = headerBack === null || headerBack.hex === 0xFFFFFF;
            if (noCustomHeaderColor && !hasBackgroundImage) {
                return hs.wrong("Looks like header's background color is not set. " +
                    "It should be an image or some non-white color.")
            }

            let footers = document.getElementsByTagName('footer');

            if (footers === null || footers.length === 0) {
                return hs.wrong('Cannot find the footer in the document.');
            } else if (headers.length > 1) {
                return hs.wrong('Found more than one footer in the document.');
            }

            hasBackgroundImage = getComputedStyle(footers[0]).background.includes('url');

            let footerBack = getRealColor(footers[0]);
            let noCustomFooterColor = footerBack === null || footerBack.hex === 0xFFFFFF;
            if (noCustomFooterColor && !hasBackgroundImage) {
                return hs.wrong("Looks like footer's background color is not set. " +
                    "It should be an image or some non-white color.")
            }

            return hs.correct()
        },

        // Test #11 - check click button and show popup window
        () => {
            let buttons = document.getElementsByClassName('open-window');

            if (buttons === null || buttons.length === 0) {
                return hs.wrong('Cannot find a button with the class "open-window" to open the pop-up window.');
            }

            let forms = document.getElementsByClassName('window');

            if (forms === null || forms.length === 0) {
                return hs.wrong('Cannot find the element with the class "window".');
            }

            return hs.correct()
        },

        // Test #12 -  check that the page has a hamburger menu
        () => {
            let buttons = document.getElementsByClassName('hamburger');

            if (buttons === null || buttons.length === 0) {
                return hs.wrong('Not find the hamburger menu on your page. Create it and set the "hamburger" class to the tag that wraps the menu elements.');
            }

            return hs.correct()
        }
    );

    await browser.close();
    return result;
}



it("Test stage", async () => {
        let result = await stageTest();
        if (result['type'] === 'wrong') {
            throw new Error(result['message']);
        }
    }
);
