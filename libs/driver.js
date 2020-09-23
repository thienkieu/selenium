const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const remote = require('selenium-webdriver/remote');

let WebDriver = function () {
    let o = new chrome.Options();
    //o.addArguments('start-fullscreen');
    //o.addArguments('disable-infobars');
    // o.addArguments('headless'); // running test on visual chrome browser
   // o.setUserPreferences({ credential_enable_service: false });
    o.options_["debuggerAddress"] = "127.0.0.1:9222";

    let driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
       //.usingServer('ws=localhost:9222/devtools/page/5B6AA7AD57566996B03562E1562C5F28')
        .build();

    return driver;
}

module.exports = WebDriver;
