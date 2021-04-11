import {By, until} from 'selenium-webdriver';
import { writeScreenshot } from './function';

let SeleniumFunction = function(driver) {
    this.driver = driver;

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    this.findByClassName = async function(className) {
        await this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Looking for element');
        return await this.driver.findElement(By.className(className));
    }

    this.findByCssSelector = async function(selector) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 15000, 'Looking for element');
        return await this.driver.findElement(By.css(selector));
    }

    this.findElementsByCssSelector = async function(selector, root) {
      if (!root) {
        await this.driver.wait(until.elementsLocated(By.css(selector)), 15000, 'Looking for element');
        return await this.driver.findElements(By.css(selector));
      }

      return await root.findElements(By.css(selector));
    }

    this.findByTagName = async function(tagName) {
        await this.driver.wait(until.elementLocated(By.tagName(tagName)), 15000, 'Looking for element');
        return await this.driver.findElement(By.tagName(tagName));
    }

    this.findByXPath = async function(xpathSelector, root, timer = 15000) {
      try {
        if (!root) {
          await this.driver.wait(until.elementLocated(By.xpath(xpathSelector)), timer, 'Looking for element');
          return await this.driver.findElement(By.xpath(xpathSelector));
        }
        return await root.findElement(By.xpath(xpathSelector));
      } catch(ex) {
        return null;
      }
    }

    this.findElementsByXPaths = async function(xpathSelector, root) {
      try {
        if (!root) {
          await this.driver.wait(until.elementsLocated(By.xpath(xpathSelector)), 15000, 'Looking for element');
          return await this.driver.findElements(By.xpath(xpathSelector));
        }

        return await root.findElements(By.xpath(xpathSelector));
      } catch(ex) {
        return null;
      }
    }


    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    // click web elements
    this.click = async function (el) {
        return await el.click();
    };

    this.takeScreenshot = async(path) => {
      const data = await  this.driver.takeScreenshot();
      writeScreenshot(data, path);
    };

};

export default SeleniumFunction;
