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
        id: 'thuhien.lethi.5095',
        port: '9222',
        userDir: 'C:\\autoFb\\hien',
        profile: 'hien',
        conversations: {},
    },
    /*{
        id: 'thien.qni',
        port: '9223',
        userDir: 'C:\\autoFb\\thien',
        profile: 'thien',
        conversations: [],
    }*/
];

(async ()=>{
    const firebaseApp = new firebaseService();
    await firebaseApp.initializeApp();
    let conversationSummery = await  firebaseApp.readOnce('converstaionSummary');
    let objectKeys = conversationSummery ? Object.keys(conversationSummery) : [];
    let updates = {};
    for(let fbIndex =0; fbIndex < fbs.length; fbIndex ++) {
        let isExisted = objectKeys.filter(m => conversationSummery[m].id === fbs[fbIndex].id);
        if (isExisted.length < 1) {
            let id = await firebaseApp.generateId('converstaionSummary');
            updates['converstaionSummary/' + id] = fbs[fbIndex];
        }
    }

    if (Object.keys(updates).length > 0) {
        console.log(updates);
        await firebaseApp.update(updates);
    }

    conversationSummery = await  firebaseApp.readOnce('converstaionSummary');
    let converstaionSummaryKey = Object.keys(conversationSummery);

    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile);
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        let seleniumFunction = new SeleniumFunction(driver);
        await seleniumFunction.visit('https://www.facebook.com/messages/t');
        console.log('log 1');
        let frame = await seleniumFunction.findByTagName('iframe');
        if (frame) {
            await driver.switchTo().frame(frame);
        }

        let nodeInfo = converstaionSummaryKey.filter(m => conversationSummery[m].id === fbs[i].id);
        let messageManager = new Message(driver, firebaseApp, conversationSummery[nodeInfo[0]], nodeInfo[0]);
        setInterval(messageManager.getNewMessages, 1000);
    }
})();


/*
let updates = [];
for(let fbsIndex = 0; fbs.length; fbsIndex++) {
    let existed = conversationSummery.filter( item => item.id === fbs[fbsIndex]);
    if (existed.length < 1) {
        let id = firebaseApp.generateId('converstaionSummary');
        let data =  fbs[fbsIndex];
        updates['converstaionSummary/' + id] = fbs[fbsIndex];
    }
}
if (updates.length > 0) {
    firebaseApp.database().ref().update(updates);
}

conversationSummery = firebaseApp.readOnce('converstaionSummary');
console.log(conversationSummery);
/*
let executeScript = async () => {
    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile);
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        let seleniumFunction = new SeleniumFunction(driver);
        await seleniumFunction.visit('https://www.facebook.com/messages/t');
        let frame = await seleniumFunction.findByTagName('iframe');
        await driver.switchTo().frame(frame);

        let messageManager = new Message(driver, firebaseApp, conversationSummery.filter(item => item.));
        setInterval(()=>{
            messageManager.getNewMessages()
        }, 2000);


    }

  //const sellingProductInterface = new SellingProduct();
  //let contentGroupIdentity = sellingProductInterface.contentGroup();

  //let uiEl = await InterfaceResolve.Single(contentGroupIdentity, null, driver);
  //let t = await uiEl.getText();
  //console.log(t);

  ///const productService = new Product(driver);
  //productService.saveProduct();*/
/*
}

executeScript();*/

