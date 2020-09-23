const { Key, By } = require('selenium-webdriver');
const SeleniumFunction = require('../libs/SeleniumFunction');
const PostProductInterface = require('../interfaces/postProduct');
const { sleep } = require('../libs/function');

let PostSellingProduct = async (driver, productInfo) => {
    let postProductInterface = new PostProductInterface(driver);
    let seleniumFunction = new SeleniumFunction(driver);
    await seleniumFunction.visit("https://www.facebook.com/marketplace/create/item");
    await sleep(1000);

    let body = await seleniumFunction.findByTagName('body');
    await body.click();

    let uploadImageEl = await postProductInterface.uploadImageFile();
    await uploadImageEl.sendKeys(productInfo.images.join(' \n ')); // "C:/Users/jack1/Downloads/97d4139c5ee8a1b6f8f9.jpg \n C:/Users/jack1/Downloads/c9806fce22badde484ab.jpg");

    let productTypeEl = await postProductInterface.getProductType();
    await productTypeEl.click();

    let productTypeItemEl = await postProductInterface.selectProductTypeItem();
    await driver.executeScript("arguments[0].scrollIntoView(true);", productTypeItemEl);
    await sleep(1000);
    await productTypeItemEl.click();


    let titleEl = await postProductInterface.getTitleEl();
    await titleEl.sendKeys(productInfo.title);

    let locationContainer = await postProductInterface.getLocationContainerEl();
    await locationContainer.click();
    sleep(1000);


    let location = await postProductInterface.getLocationEl();
    await location.sendKeys(productInfo.location);
    sleep(1000);
    let locationItem = await postProductInterface.selectLocationItemEl(productInfo.location);
    await locationItem.click();
    sleep(1000);

    let description = await postProductInterface.getDescriptionEl();
    await description.sendKeys(productInfo.description);

    let branchEl = await postProductInterface.getBranchEl();
    await branchEl.sendKeys(productInfo.branch);

    let sizeEl = await postProductInterface.getSizeEl();
    await sizeEl.sendKeys(productInfo.size);

    let statusEl = await postProductInterface.getStatusEl();
    await statusEl.click();
    sleep(1000);
    let newStatus = await postProductInterface.getNewStatusEl();
    await newStatus.click();

    let priceEl = await postProductInterface.getPriceEl();
    await priceEl.sendKeys(productInfo.price);

    let nextButtonEl = await postProductInterface.getNextButton("Tiếp");
    await nextButtonEl.click();

    let groupNames = productInfo.groups;

    for(let i= 0; i< groupNames.length; i++){
        let otherGroupEl = await postProductInterface.selectOtherGroupEl(groupNames[i]);
        await otherGroupEl.click();
    }

    let finishButtonEl = await postProductInterface.getNextButton("Đăng");
    //await finishButtonEl.click();

}

module.exports = PostSellingProduct;
