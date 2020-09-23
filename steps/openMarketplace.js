const SeleniumFunction = require('../libs/SeleniumFunction');

let OpenMarketplace = async (driver) => {
    let seleniumFunction = new SeleniumFunction(driver);
    await seleniumFunction.visit("https://www.facebook.com/marketplace/selling");
}

module.exports = OpenMarketplace;
