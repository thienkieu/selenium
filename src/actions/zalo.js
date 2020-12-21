import chromedriver from 'chromedriver';
import { Key, By } from 'selenium-webdriver';
import WebDriver from '../common/driver';
import SeleniumFunction from '../common/SeleniumFunction'
import SellingProduct from './interface/zalo/SellingProduct';
import InterfaceResolve from './interface/InterfaceResolve';
import Product from '../actions/business/zalo/Product';

let driver = new WebDriver();
let seleniumFunction = new SeleniumFunction(driver);

let executeScript = async () => {

  seleniumFunction.visit('https://www.facebook.com/');
  const sellingProductInterface = new SellingProduct();
  let contentGroupIdentity = sellingProductInterface.contentGroup();


  const productService = new Product(driver);
  productService.saveProduct();

}

executeScript();

