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
import Login from './src/actions/business/facebook/Login';
import { sleep, getCurrentDateTime } from './libs/function';

const fbs = [
   /* ,
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
    },*/
    {
        id: 'thien',
        port: '9229',
        userDir: 'C:\\autoFb\\thien',
        profile: 'thien',
        conversations: {},
        email: 'thien1988@gmail.com',
        password: 'fb0958588127thien'
    },
    {
        id: 'duyen',
        port: '9241',
        userDir: 'C:\\autoFb\\duyen',
        profile: 'duyen',
        conversations: {},
        email: '0393223097',
        password: 'Gaucon12345123123'
    }
];

let executeScript = async () => {
    const firebaseApp = new firebaseService();
    await firebaseApp.initializeApp();
    
    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        setTimeout(async () => {
            await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, true);
            let driver = new WebDriver(fbs[i].port);
           /* drivers.push({
                id: fbs[i].id,
                driver: driver,
            });*/

            
            let seleniumFunction = new SeleniumFunction(driver);
            console.log('before sleep');
            await sleep(5000);
            console.log('after sleep');

            await seleniumFunction.visit('https://www.facebook.com/messages/t');
            await sleep(5000);
            let login = new Login(driver);
            await login.login(fbs[i].email, fbs[i].password);
            let name = 'openMessagePage'+ getCurrentDateTime()+'.png';
            seleniumFunction.takeScreenshot(name);
            /*let frame = await seleniumFunction.findByTagName('iframe');
            if (frame) {
                await driver.switchTo().frame(frame);
            }*/
            
            delete fbs[i].email;
            delete fbs[i].password;

            let messageManager = new Message(driver, firebaseApp, fbs[i]);
            messageManager.processMessage();
        }, i*15000);

    }

}

executeScript();

