const chromedriver = require('chromedriver');
const { Key, By } = require('selenium-webdriver');

const WebDriver = require('./libs/driver');
const SeleniumFunction = require('./libs/SeleniumFunction');
const LoginInterface = require('./interfaces/login');
const LoginStep = require('./steps/login');
const OpenMarketplace = require('./steps/openMarketplace');
const PostProduct = require('./steps/postSelling');
const ZaloStep = require('./steps/zalo');

const { sleep }  = require('./libs/function');

let driver = new WebDriver();
let seleniumFunction = new SeleniumFunction(driver);

let executeScript = async () => {
    await LoginStep(driver);
    await sleep(2000);
    await OpenMarketplace(driver);
    await sleep(2000);

    let productInfo = {
        title: "dep đi mưa",
        description: "du size cac loại",
        size: "34 35",
        location: "Đà Nẵng",
        branch: 'GPShop',
        images: [
          'C:/Users/jack1/Downloads/97d4139c5ee8a1b6f8f9.jpg',
          'C:/Users/jack1/Downloads/c9806fce22badde484ab.jpg'
        ],
        groups: [
            "Chợ tốt Hậu Giang",
            "CHỢ TỐT HẬU GIANG ❤️ THẦN TÀI 39 ❤️",
        ],
        price: '100000'
    };
    await PostProduct(driver, productInfo);

    //await ZaloStep(driver);

    let el = await seleniumFunction.findByTagName('body');
    let t = await el.getText();
    console.log(t);

}

executeScript().then(()=>{
    setTimeout(()=> {

        seleniumFunction.findByTagName('title').then((el)=>{
            console.log(el);
            el.getText().then(t => {
              console.log(t);
            });

            //el.sendKeys(Key.ESCAPE);
        });

    }, 5000);
});
