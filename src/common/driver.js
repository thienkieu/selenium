import { Builder, By, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

let WebDriver = function () {
    let o = new chrome.Options();
    o.addArguments('start-fullscreen');
    o.addArguments('disable-infobars');
    o.addArguments('headless'); // running test on visual chrome browser
   // o.setUserPreferences({ credential_enable_service: false });
    o.options_["debuggerAddress"] = "127.0.0.1:9222";

    let driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    return driver;
}

export default WebDriver;
