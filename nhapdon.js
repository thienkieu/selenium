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

/*au.Init();
au.Run("notepad.exe");
au.WinWait("[Class:Notepad]");
au.Send("Hello, autoit & nodejs!");
*/


const fbs = [
    {
        id: 'thuhien.lethi.5095',
        port: '9222',
        userDir: 'C:\\autoFb\\hien',
        profile: 'hien',
        conversations: {},
    }
];

(async ()=>{
    let lines = [];
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('don.txt')
      });
      
    lineReader.on('line', function (line) {
        lines.push(line);
    });
    await sleep(1000);
    let ok = true;
    for (let i = 0; i < lines.length; i++) {
        let images = lines[i].substring(0, lines[i].indexOf(' ')).split('|');
        for(let imageIndex = 0; imageIndex < images.length; imageIndex++) {
            if (!fs.existsSync("D:\\giay_dep\\nhap_don\\" + images[imageIndex] +'.jpg')) {
                console.log(images[imageIndex] + ' not existed');
                ok = false;
            }
        }
    
    }
    console.log(ok);
    if (ok == false) {
        return;
    }

    let drivers = [];
    let channelName = '(8) Đơn bạn hiền';
    for(let i = 0;i < fbs.length; i++) {
        await startChrome(fbs[i].port, fbs[i].userDir, fbs[i].profile, false);
        let driver = new WebDriver(fbs[i].port);
        drivers.push({
            id: fbs[i].id,
            driver: driver,
        });

        au.Init();
        let seleniumFunction = new SeleniumFunction(driver);
        await seleniumFunction.visit('https://chat.zalo.me/');
        let chatName = await seleniumFunction.findByXPath('//span[.="'+channelName+'"]');
        await chatName.click();
        await sleep(1000);

        let index = 0;
        let startNumber = 1273;
        
         while(index < lines.length){
            await sleep(500);
            try{
                chatName = await seleniumFunction.findByXPath('//span[.="'+channelName+'"]');
                await chatName.click();
                await sleep(500);
            } catch(e){
                chatName = await seleniumFunction.findByXPath('//span[.="'+channelName+'"]');
                await chatName.click();
                await sleep(500);
            }
            
            try{
                let enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, " **************************************************************** ");
                await sleep(500);
            } catch (e) {
                let enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, " **************************************************************** ");
                await sleep(500);
            }
            try {
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            } catch(e) {
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            }
            

            try {
                enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, " Đơn "+(1 +index + startNumber) );
                await sleep(500);
            } catch(e) {
                enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, " Đơn "+(1 +index) );
                await sleep(500);
            }
            
            try {
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            } catch(e) {
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            }
            
            let images = lines[index].substring(0, lines[index].indexOf(' ')).split('|');
            for(let imageIndex = 0; imageIndex < images.length; imageIndex++) {
                try {
                    let uploadImageIcon = await seleniumFunction.findByXPath('//div[@icon="chatbar-photo"]');
                    await uploadImageIcon.click();
                    await sleep(1000);
                } catch(e) {
                    let uploadImageIcon = await seleniumFunction.findByXPath('//div[@icon="chatbar-photo"]');
                    await uploadImageIcon.click();
                    await sleep(1000);
                }

                au.Send("D:\\giay_dep\\nhap_don\\" + images[imageIndex] +'.jpg');
                au.Send("{ENTER}");
                await sleep(1000);
            }

            
            try{
                chatName = await seleniumFunction.findByXPath('//span[.="'+channelName+'"]');
                await chatName.click();
                await sleep(500);
            } catch(e){
                chatName = await seleniumFunction.findByXPath('//span[.="'+channelName+'"]');
                await chatName.click();
                await sleep(500);
            }


            //au.Send("dep kep quay nhung");
            //au.Send("{ENTER}");
            //div[@id="richInput"]

            //let enterText1 = await seleniumFunction.findByXPath('//div[@class="chat-input__content"]');
            //await enterText1.click();
            //sleep(1000);

            //let sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
            

            
            let text = lines[index].substring(lines[index].indexOf(' '));
            try{
                enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, text);
                await sleep(500);
            }catch(e) {
                enterText = await seleniumFunction.findByXPath('//div[@id="richInput"]');
                await seleniumFunction.write(enterText, text);
                await sleep(500);
            }
            
            try{
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            } catch(e) {
                sentText = await seleniumFunction.findByXPath('//div[@class="z--btn z--btn--text--primary -lg --rounded send-btn-chatbar input-btn"]');
                await sentText.click();
                await sleep(500);
            }
            
            
            index++;
        }
        
    }
})();