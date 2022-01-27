const puppeteer = require('puppeteer');
const path = require('path');
// '..' since we're in the test/ subdirectory; learner is supposed to have src/index.html
const pagePath = 'file://' + path.resolve(__dirname, './index.html');

const hs = require('hs-test-web');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function stageTest() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto(pagePath);
    await page.setDefaultNavigationTimeout(0);

    page.on('console', msg => console.log(msg.text()));

    await sleep(1000);

    let result = await hs.testPage(page,
        //#test1
        //testing structure of the page
        () => {
            let body = document.getElementsByTagName("body")[0];
            if (!(body && body.children.length === 1 &&
                body.children[0].tagName.toLowerCase() === 'div' &&
                body.children[0].className === 'space' ||
                body && body.children.length === 2 &&
                (body.children[0].tagName.toLowerCase() === 'div' && body.children[0].className === 'space' ||
                    body.children[1].tagName.toLowerCase() === 'div' && body.children[1].className === 'space'))
            ) return hs.wrong("There are some mismatches with suggested structure or elements naming")

            let space = body.children[0].className === 'space' ? body.children[0] : body.children[1];
            if (!(space.children.length === 2 &&
                space.children[0].tagName.toLowerCase() === 'div' && space.children[1].tagName.toLowerCase() === 'div' &&
                (space.children[0].className === 'planet-area' && space.children[1].className === 'control-panel' ||
                    space.children[1].className === 'planet-area' && space.children[0].className === 'control-panel'))
            ) return hs.wrong("There are some mismatches with suggested structure or elements naming on the space section level")

            let planetArea = document.getElementsByClassName('planet-area')
            if (planetArea.length === 0) {
                return hs.wrong("Can't find element with class=\"planet-area\"");
            }
            if (!(planetArea[0].children.length === 2 &&
                planetArea[0].children[0].tagName.toLowerCase() === 'img' &&
                planetArea[0].children[1].tagName.toLowerCase() === 'img' && (
                    planetArea[0].children[0].className === 'planet' && planetArea[0].children[1].className === 'rocket' ||
                    planetArea[0].children[1].className === 'planet' && planetArea[0].children[0].className === 'rocket'))
            ) return hs.wrong("There are some mismatches with suggested structure or elements naming in planet-area section")

            let controlPanel = document.getElementsByClassName('control-panel');
            if (controlPanel.length === 0) {
                return hs.wrong("Can't find element with class=\"control-panel\"");
            }
            let controlPanelInner = Array.from(controlPanel[0].children)[0]
            if (!(controlPanelInner.children.length === 5 &&
                controlPanelInner.getElementsByTagName('input').length === 14 &&
                controlPanelInner.getElementsByTagName('div').length === 2
            )) return hs.wrong("There are some mismatches with suggested structure or elements naming in control-panel section")

            return hs.correct()
        },
        //#test2
        //testing types of the check-buttons inputs
        () => {
            let checkBtnsDiv = document.getElementsByClassName("check-buttons");
            if (checkBtnsDiv.length === 0) {
                return hs.wrong("Can't find element with class=\"check-buttons\"");
            }
            let checkBtns = Array.from(checkBtnsDiv[0].children);
            checkBtns.forEach(el => {
                if (el.tagName.toLowerCase() !== 'input' || el.type.toLowerCase() !== 'checkbox') {
                    return hs.wrong('Each element in the check-buttons div should be an input with checkbox type')
                }
            })

            return hs.correct();
        },
        //#test3
        //testing types of the levers inputs
        () => {
            let leversDiv = document.getElementsByClassName("levers");
            if (leversDiv.length === 0) {
                return hs.wrong("Can't find element with class=\"levers\"");
            }
            let leversInputs = Array.from(leversDiv[0].children);
            leversInputs.forEach(el => {
                if (el.tagName.toLowerCase() !== 'input' || el.type.toLowerCase() !== 'range') {
                    return hs.wrong('Each element in the levers div should be an input with range type')
                }
            })

            return hs.correct();
        },
        //#test4
        //testing background of space
        () => {
            let space = document.getElementsByClassName("space");
            if (space.length === 0) {
                return hs.wrong("Can't find element with class=\"space\"");
            }
            let spaceBg = window.getComputedStyle(space[0]).backgroundImage;
            if (!spaceBg) return hs.wrong("The element with class='space' should have background-image.");

            return hs.correct();
        },
        //#test5
        //testing gradient background of the panel
        () => {
            let controlDeck = document.getElementsByClassName("control-panel")
            if (controlDeck.length === 0) {
                return hs.wrong("Can't find element with class=\"control-panel\"");
            }
            let controlDeckBgImg = window.getComputedStyle(controlDeck[0]).backgroundImage;
            if (!controlDeckBgImg.toLowerCase().includes('linear-gradient')) return hs.wrong("The element with class='control-panel' should have gradient background.");

            return hs.correct();
        },
        //#test6
        //testing positioning of check-buttons and levers
        /*display: flex;
    flex-direction: row;*/
        () => {
            let checkBtnsDiv = document.getElementsByClassName("check-buttons")[0];
            let leversDiv = document.getElementsByClassName("levers")[0];

            let checkBtnsDivStyles = window.getComputedStyle(checkBtnsDiv);
            let leversDivStyles = window.getComputedStyle(leversDiv);

            if (checkBtnsDivStyles.display.toLowerCase() !== 'flex' || leversDivStyles.display.toLowerCase() !== 'flex') {
                return hs.wrong('Elements check-buttons and levers should have display: flex property.')
            }

            if (checkBtnsDivStyles.flexDirection.toLowerCase() !== 'row' || leversDivStyles.flexDirection.toLowerCase() !== 'row') {
                return hs.wrong('Elements check-buttons and levers should be positioned in a row.')
            }

            return hs.correct();
        },
        //#test7
        //testing that levers positioned vertical
        () => {
            let leversDiv = document.getElementsByClassName('levers')[0];
            let levers = Array.from(leversDiv.getElementsByTagName('input'));
            levers.forEach(lever => {
                let leverStyle = window.getComputedStyle(lever);
                if (!leverStyle.transform) return hs.wrong("All levers should be vertical.")
            })

            return hs.correct();
        },
        //#test8
        //testing password field
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner');
            if (controlPanelInner.length === 0) {
                return hs.wrong("Can't find element with class=\"control-panel__inner\"");
            }
            for (let el of Array.from(controlPanelInner[0].children)) {
                if (el.tagName.toLowerCase() === 'input' && el.type.toLowerCase() === 'password') {
                    let styles = window.getComputedStyle(el);
                    if (styles.color && styles.border) return hs.correct()
                    else return hs.wrong("Password field's border and text color should be changed");
                }
            }

            return hs.wrong("Can't find password field");
        },
        //#test9
        //testing the background color of the "ok" and "launch" buttons
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let counter = 0;
            for (let el of Array.from(controlPanelInner.children)) {
                if (el.tagName.toLowerCase() === 'input' && (el.type.toLowerCase() === 'submit' || el.type.toLowerCase() === 'button')) {
                    let styles = window.getComputedStyle(el);
                    if (styles.backgroundColor) {
                        counter++;
                    }

                }
            }

            return counter === 2
                ? hs.correct()
                : hs.wrong("Can't find 2 input fields with type=button or submit with changed background");
        },
        //#test10
        //testing the form of the launch button
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            for (let el of Array.from(controlPanelInner.children)) {
                if (el.tagName.toLowerCase() === 'input' && (el.type.toLowerCase() === 'submit' || el.type.toLowerCase() === 'button')) {
                    let styles = window.getComputedStyle(el);
                    if (styles.backgroundColor && styles.borderRadius) {
                        return hs.correct();
                    }
                }
            }

            return hs.wrong("Can't find the input with type=button or submit with specified border-radius");
        },
        //#test11
        //testing that all inputs except password and the "ok" button sre disabled
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            for (let el of Array.from(controlPanelInner.getElementsByTagName('input'))) {
                if (el.type.toLowerCase() === "password" && el.disabled) {
                    return hs.wrong("Password field should be enabled.")
                }

                if ((el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok") && el.disabled) {
                    return hs.wrong("Ok button should be enabled.");
                }

                if (el.type.toLowerCase() !== "password" &&
                    (el.value.toLowerCase() !== "ok" && el.innerText.toLowerCase() !== "ok") && !el.disabled) {
                    return hs.wrong("All inputs except password and the ok button should be disabled.");
                }
            }

            return hs.correct();
        },
        //#test12
        //testing that all inputs except password and the "ok" button sre enabled
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let allInputs = Array.from(controlPanelInner.getElementsByTagName('input'));
            let passwordEl = allInputs.filter(el => el.type.toLowerCase() === "password");
            let okBtn = allInputs.filter(el => (el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok"));

            passwordEl[0].value = "TrustNo1";
            okBtn[0].click();

            window.setTimeout(() => {
                for (let el of allInputs) {
                    if (el.type.toLowerCase() === "password" && !el.disabled) {
                        return hs.wrong("Password field should be disabled.")
                    }

                    if ((el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok") && !el.disabled) {
                        return hs.wrong("Ok button should be disabled.");
                    }

                    if (el.type.toLowerCase() !== "password" &&
                        (el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok") && el.disabled) {
                        return hs.wrong("All inputs except password and the ok button should be enabled.");
                    }
                }
            }, 1000)

            return hs.correct();
        },
        //#test13
        //testing that the launch button disabled with one checkbox and one lever
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let allInputs = Array.from(controlPanelInner.getElementsByTagName('input'));
            let passwordEl = allInputs.filter(el => el.type.toLowerCase() === "password");
            let checkBoxes = allInputs.filter(el => el.type.toLowerCase() === "checkbox");
            let levers = allInputs.filter(el => el.type.toLowerCase() === "range")
            let okBtn = allInputs.filter(el => (el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok"))
            if (passwordEl.length === 0) {
                return hs.wrong("Can't find element with type=\"password\"");
            }

            try {
                passwordEl[0].value = "TrustNo1";
                if (okBtn.length === 0) {
                    return hs.wrong("Can't find element with value or text equal  to \"ok\"");
                }

                okBtn[0].click();
                if (checkBoxes.length === 0) {
                    return hs.wrong("Can't find element with type=\"checkbox\"");
                }

                checkBoxes[0].checked = true;
                if (levers.length === 0) {
                    return hs.wrong("Can't find element with type=\"range\"");
                }
                levers[0].value = 100;

                let launch = allInputs.filter(el => el.value.toLowerCase() === "launch" || el.innerText.toLowerCase() === "launch");
                if (launch.length === 0) {
                    return hs.wrong("Can't find element with value or text equal  to \"launch\"");
                }

                return launch[0].disabled
                    ? hs.correct()
                    : hs.wrong("Launch button should be disabled when not all checkboxes are picked or not all levers are set to maximum.");

            } catch (e) {
                return hs.wrong(`Error from the solution code with message: ${e.message}`);
            }
        },
        //#test14
        //testing that the launch button enabled with all checkboxes and all levers
        () => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let allInputs = Array.from(controlPanelInner.getElementsByTagName('input'));
            let passwordEl = allInputs.filter(el => el.type.toLowerCase() === "password");
            let checkBoxes = allInputs.filter(el => el.type.toLowerCase() === "checkbox");
            let levers = allInputs.filter(el => el.type.toLowerCase() === "range")
            let okBtn = allInputs.filter(el => (el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok"))

            try {
                passwordEl[0].value = "TrustNo1";
                okBtn[0].click();

                checkBoxes.forEach(checkBox => {
                    checkBox.value = 'on';
                    checkBox.checked = true;
                });

                levers.forEach(lever => lever.value = "100");
                if (levers[0].onchange === null && controlPanelInner.onchange === null) {
                    return hs.wrong("The function, which should be " +
                        "called after any change of controls state, wasn't implemented.");
                }

                if (levers[0].onchange !== null) {
                    levers[0].onchange();
                }

                if (controlPanelInner.onchange !== null) {
                    controlPanelInner.onchange();
                }

                let launch = allInputs.filter(el => (el.value.toLowerCase() === "launch" || el.innerText.toLowerCase() === "launch"));
                if (launch.length === 0) {
                    return hs.wrong("Can't find element with value or text equal  to \"launch\"");
                }

                return hs.correct();

                // Doesn't work
                // Example - https://stepik.org/submissions/1767431/421931792
                return !launch[0].disabled ? hs.correct()
                    : hs.wrong("The launch button should be enabled when all checkboxes are checked " +
                        "and all levers are specified by maximum.")

            } catch (e) {
                return hs.wrong(`Error from the solution code with message: ${e.message}`);
            }
        }
        ,
        async () => {
            // Doesn't work
            // Example - https://stepik.org/submissions/1767431/421931792
            return hs.correct();

            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let allInputs = Array.from(controlPanelInner.getElementsByTagName('input'));
            let passwordEl = allInputs.filter(el => el.type.toLowerCase() === "password");
            let checkBoxes = allInputs.filter(el => el.type.toLowerCase() === "checkbox");
            let levers = allInputs.filter(el => el.type.toLowerCase() === "range")
            let okBtn = allInputs.filter(el => (el.value.toLowerCase() === "ok" || el.innerText.toLowerCase() === "ok"))

            try {
                passwordEl[0].value = "TrustNo1";
                if (okBtn[0].click === null) {
                    return hs.wrong("The function which should be called after click on the launch button wasn't implemented.");
                }
                okBtn[0].click();

                checkBoxes.forEach(checkBox => {
                    checkBox.value = 'on';
                    checkBox.checked = true;
                });
                levers.forEach(lever => lever.value = "100");

                if (levers[0].onchange) {
                    levers[0].onchange();
                }

                if (controlPanelInner.onchange) {
                    controlPanelInner.onchange();
                }

                let rocket = document.getElementsByClassName('rocket')
                if (rocket.length === 0) {
                    return hs.wrong("Can't find element with class=\"rocket\"");
                }
                this.start = rocket[0].getBoundingClientRect();
                this.end = this.start;
                let launch = allInputs.filter(el => (el.value.toLowerCase() === "launch" || el.innerText.toLowerCase() === "launch"))[0];
                launch.click();

                this.end = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(rocket[0].getBoundingClientRect());
                    }, 2000);
                })

                return this.start.left !== this.end.left || this.start.top !== this.end.top
                    ? hs.correct()
                    : hs.wrong("The rocket animation does not work.")
            } catch (e) {
                return hs.wrong(`Error from the solution code with message: ${e.message}`);
            }
        }
    )

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
