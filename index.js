import WebDriver from './libs/driver';
import SeleniumFunction from './libs/SeleniumFunction'
import startChrome from './src/common/startChrome';


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

    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, false);
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        let seleniumFunction = new SeleniumFunction(driver);
        await seleniumFunction.visit('https://twitter.com/?lang=en');
        await seleniumFunction.takeScreenshot('./images/twiter.png');
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

