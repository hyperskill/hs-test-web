import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'
const workingDir = path.join(import.meta.url, '../')
const pagePath = path.join(import.meta.url, '../index.html')

//const {StageTest, correct, wrong} = require('hs-test-web');

class ConverterTest extends StageTest {

    page = this.getPage(pagePath)


    tests = [
        this.page.execute(() => {
            const nodes = document.getElementsByClassName("title");

            if (nodes.length !== 1) {
                return wrong("There should be one element with class 'title', found " + nodes.length + "!")
            }

            const titleDiv = nodes[0];

            if (titleDiv.textContent !== 'Case Converter') {
                return wrong("The title name should be 'Case Converter', but found " + titleDiv.textContent.trim())
            }

            return correct()
        }),
        this.page.execute(() => {
            const nodes = document.getElementsByTagName("textarea");

            if (nodes.length !== 1) {
                return wrong("There should be one 'textarea' element, found " + nodes.length + "!")
            }

            this.textArea = nodes[0];

            if (this.textArea.textContent.trim() !== '') {
                return wrong("TextArea should be empty by default!")
            }

            return correct()
        }),
        this.page.execute(() => {
            this.upperCaseButton = document.querySelector("button#upper-case")
            this.lowerCaseButton = document.querySelector("button#lower-case")
            this.properCaseButton = document.querySelector("button#proper-case")
            this.sentenceCaseButton = document.querySelector("button#sentence-case")
            this.saveTextFileButton = document.querySelector("button#save-text-file")

            if (this.upperCaseButton === null) {
                return wrong("Can't find a button with '#upper-case' id!")
            }

            if (this.lowerCaseButton === null) {
                return wrong("Can't find a button with '#lower-case' id!")
            }

            if (this.properCaseButton === null) {
                return wrong("Can't find a button with '#proper-case' id!")
            }

            if (this.sentenceCaseButton === null) {
                return wrong("Can't find a button with '#sentence-case' id!")
            }

            if (this.saveTextFileButton === null) {
                return wrong("Can't find a button with '#save-text-file' id!")
            }

            return correct()
        }),
        this.page.execute(() => {

            this.textArea.value = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
                ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

            const upperCaseText = 'LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.' +
                ' LOREM IPSUM HAS BEEN THE INDUSTRY\'S STANDARD DUMMY TEXT EVER SINCE THE 1500S,' +
                ' WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'

            this.upperCaseButton.click()

            if (this.textArea.value !== upperCaseText) {
                return wrong("After clicking on 'Upper Case' button your text is wrong!")
            }

            const lowerCaseText = 'lorem ipsum is simply dummy text of the printing and typesetting industry.' +
                ' lorem ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

            this.lowerCaseButton.click()

            if (this.textArea.value !== lowerCaseText) {
                return wrong("After clicking on 'Lower Case' button your text is wrong!")
            }

            const properCase = 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.' +
                ' Lorem Ipsum Has Been The Industry\'s Standard Dummy Text Ever Since The 1500s,' +
                ' When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.'

            this.properCaseButton.click()

            if (this.textArea.value !== properCase) {
                return wrong("After clicking on 'Proper Case' button your text is wrong!")
            }

            const sentenceCase = 'Lorem ipsum is simply dummy text of the printing and typesetting industry.' +
                ' Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

            this.sentenceCaseButton.click()

            if (this.textArea.value !== sentenceCase) {
                return wrong("After clicking on 'Sentence Case' button your text is wrong!")
            }

            return correct()
        }),
        this.node.execute(async () => {

            // const client = await this.page.pageInstance.target().createCDPSession()
            // await client.send(
            //     'Page.setDownloadBehavior', {
            //         behavior: 'allow',
            //         downloadPath: workingDir + path.sep + "downloads"
            //     }
            // );
            // const client = await (await this.page._target().createCDPSession()).send(
            //     'Page.setDownloadBehavior', {
            //         behavior: 'allow',
            //         downloadPath: workingDir + path.sep + "downloads"
            //     }
            // );

            await (await this.page.pageInstance.target().createCDPSession()).send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: workingDir + path.sep + "downloads"
            });
            return correct()
        }),
        this.page.execute(async () => {
            await this.saveTextFileButton.click()

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(2000);

            return correct()
        }),
    ]
}

it('Test stage', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    try {
        await new ConverterTest().runTests();
    } catch (e) {
        console.log(e);
        throw new Error("The test should pass all test cases!");
    }
}, 30000)

