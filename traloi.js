const chromedriver = require('chromedriver');
const { Key, By } = require( 'selenium-webdriver');
const WebDriver = require( './src/common/driver');
const SeleniumFunction = require( './src/common/SeleniumFunction');
const InterfaceResolve = require( './src/actions/interface/InterfaceResolve');
const startChrome = require( './src/common/startChrome');
const au = require('autoit');
const { sleep } = require('./libs/function');
const readline = require('readline');
const fs = require('fs')

const fbs = [
    {
        id: 'thuhien.lethi.5095',
        port: '9234',
        userDir: 'C:\\autoFb\\hien',
        profile: 'hien',
        conversations: {},
    },
];

(async ()=>{

    /*var au = require('autoit');
 
    au.Init();
    au.Run("notepad.exe");
    au.WinWait("[Class:Notepad]");
    au.Send("Hello, autoit & nodejs!");

    return ;*/
    let drivers = [];
    for(let i = 0;i < fbs.length; i++) {
        //await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, false);
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        let seleniumFunction = new SeleniumFunction(driver);
        let number = 0;
        while(number < 10) {
            let chatTabs = await seleniumFunction.findElementsByXPaths('//div[@data-pagelet="ChatTab"]');
            for(let chatindex = 0 ; chatindex < chatTabs.length ; chatindex++) {
                let titleOfChat = await seleniumFunction.findByXPath('.//span[@class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db e9vueds3 j5wam9gi knj5qynh oo9gr5id hzawbc8m"]', chatTabs[chatindex]);
                let textTitle = await titleOfChat.getText();

                let messageContainer =  await seleniumFunction.findByXPath('.//div[@role="grid"]', chatTabs[chatindex]);
                let messageItems =  await seleniumFunction.findElementsByXPaths('.//div', messageContainer);
                for(let m = 0; m < messageItems.length; m++) {
                    let t = await (messageItems[m]).getText();
                    console.log(t);
                }
                
            }

            number ++;
            
            
        }
    }
})();
