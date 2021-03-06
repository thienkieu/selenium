const SeleniumFunction = require('../libs/SeleniumFunction');


let MarketplaceInterface = function(driver){
    this.seleniumFunction = new SeleniumFunction(driver);
    
    this.getPostProduct = async () => {
       let el = await this.seleniumFunction.findByName('email');
       return el;
    };

    this.getInputPassword = () => {
        let el = this.seleniumFunction.findByName('pass');
        return el;
    }

    this.getLoginButton = () => {
        let el = this.seleniumFunction.findByName('login');
        return el;
    }
}

module.exports = MarketplaceInterface;