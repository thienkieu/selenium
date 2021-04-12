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
        await seleniumFunction.visit('https://www.binance.com/en/futures-activity/leaderboard/user?uid=91CDA0C27F7A387F7FDA5D0CA4781194&tradeType=PERPETUAL');
        while(true) { 
            let trs = await seleniumFunction.findElementsByXPaths('//div[@class="css-18t1k5s"]//tbody//tr');
            for(let trIndex = 0; trIndex < trs.length; trIndex++) {
                let tds =  await seleniumFunction.findElementsByXPaths('.//td', trs[trIndex]);
                let symbol = await tds[0].getText();
                let size = await tds[1].getText();
                let entryPrice = await tds[2].getText();
                let markPrice = await tds[3].getText();
                let pnl = await tds[4].getText();
                let info = {
                    symbol,
                    size,
                    entryPrice,
                    markPrice,
                    pnl
                };
                console.log(info);
            }

            await sleep(10000);
            driver.navigate().refresh();
        }
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

