import chromedriver from 'chromedriver';
import { Key, By } from 'selenium-webdriver';
import WebDriver from './src/common/driver';
import SeleniumFunction from './src/common/SeleniumFunction'
import SellingProduct from './src/actions/interface/zalo/SellingProduct';
import InterfaceResolve from './src/actions/interface/InterfaceResolve';
import Product from './src/actions/business/zalo/Product';
import startChrome from './src/common/startChrome';
import firebaseService from './libs/firebase';
import Message from './src/actions/business/facebook/Message';

const fbs = [
    {
        id: 'thien',
        port: '9229',
        userDir: 'C:\\autoFb\\thien',
        profile: 'thien',
        conversations: {},
    }/*,
    {
        id: '800',
        port: '9230',
        userDir: 'C:\\autoFb\\fb800',
        profile: '800',
        conversations: [],
    },
    {
        id: 'hien',
        port: '9225',
        userDir: 'C:\\autoFb\\hien',
        profile: 'hien',
        conversations: [],
    }*/
];

let executeScript = async () => {
    const firebaseApp = new firebaseService();
    await firebaseApp.initializeApp();
    
    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        setTimeout(async () => {
            await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, false);
            let driver = new WebDriver(fbs[i].port);
           /* drivers.push({
                id: fbs[i].id,
                driver: driver,
            });*/

            let seleniumFunction = new SeleniumFunction(driver);
            await seleniumFunction.visit('https://www.facebook.com/messages/t');
            console.log('visit facebook');
            /*let frame = await seleniumFunction.findByTagName('iframe');
            if (frame) {
                await driver.switchTo().frame(frame);
            }*/
            
            let messageManager = new Message(driver, firebaseApp, fbs[i]);
            messageManager.processMessage();
        }, i*15000);

    }

}

executeScript();

