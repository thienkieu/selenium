const { Builder, By, until} = require ('selenium-webdriver');
const chrome  = require('selenium-webdriver/chrome');

let WebDriver = function (port) {
    let o = new chrome.Options();
    //o.addArguments('start-fullscreen');
    //o.addArguments('disable-infobars');
   // o.addArguments('headless'); // running test on visual chrome browser
   // o.setUserPreferences({ credential_enable_service: false });
    //o.addArguments("user-data-dir=C:\\selenum\\ChromeProfile");
    //o.addArguments("profile-directory=Profile 34");
    o.options_["debuggerAddress"] = "127.0.0.1:"+port;

    let driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    return driver;
}

module.exports =  WebDriver;
