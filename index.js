import chromedriver from 'chromedriver';
import { Key, By } from 'selenium-webdriver';
import WebDriver from './src/common/driver';
import SeleniumFunction from './src/common/SeleniumFunction'
import SellingProduct from './src/actions/interface/zalo/SellingProduct';
import InterfaceResolve from './src/actions/interface/InterfaceResolve';
import Product from './src/actions/business/zalo/Product';

let driver = new WebDriver();
let seleniumFunction = new SeleniumFunction(driver);

let executeScript = async () => {
    await seleniumFunction.visit('https://www.facebook.com/');
    console.log('sdfsfsd');
  /*const sellingProductInterface = new SellingProduct();
  let contentGroupIdentity = sellingProductInterface.contentGroup();

  let uiEl = await InterfaceResolve.Single(contentGroupIdentity, null, driver);
  let t = await uiEl.getText();
  console.log(t);

  const productService = new Product(driver);
  productService.saveProduct();*/

}

executeScript();

