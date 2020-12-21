import chromedriver from 'chromedriver';
import { Key, By } from 'selenium-webdriver';
import WebDriver from '../common/driver';
import SeleniumFunction from '../common/SeleniumFunction'
import SellingProduct from './interface/zalo/SellingProduct';
import InterfaceResolve from './interface/InterfaceResolve';
import Product from '../actions/business/zalo/Product';
import { zaloChromeProfiles } from '../config';

let executeScript = async () => {

    await startChrome(zaloChromeProfiles[0].port, zaloChromeProfiles[0].userDir, zaloChromeProfiles[0].profile);
    let driver = new WebDriver(zaloChromeProfiles[0].port);
    let seleniumFunction = new SeleniumFunction(driver);
    await seleniumFunction.visit('https://www.facebook.com/messages/t');

    console.log('log 1');
    let frame = await seleniumFunction.findByTagName('iframe');
    if (frame) {
        await driver.switchTo().frame(frame);
    }

  seleniumFunction.visit('https://www.facebook.com/');
  const sellingProductInterface = new SellingProduct();
  let contentGroupIdentity = sellingProductInterface.contentGroup();


  const productService = new Product(driver);
  productService.saveProduct();

}

executeScript();

