import WebDriver from './libs/driver';
import { sleep } from './libs/function';
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
        await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, true, 'linux');
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        let seleniumFunction = new SeleniumFunction(driver);
        await seleniumFunction.visit('https://twitter.com/login');
        let inputUserName = await seleniumFunction.findByXPath('//input[@name="session[username_or_email]"][@type="text"]');
        await seleniumFunction.write(inputUserName, 'thien.kieuvm@gmail.com');
        let inputPassword = await seleniumFunction.findByXPath('//input[@name="session[password]"][@type="password"]');
        await seleniumFunction.write(inputPassword, '0958588127thien');

        let loginButton = await seleniumFunction.findByXPath('//div[@data-testid="LoginForm_Login_Button"][@role="button"][.="Log in"]');
        await loginButton.click();
        sleep(5000);
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

