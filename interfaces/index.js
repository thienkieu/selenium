const SeleniumFunction = require('../libs/SeleniumFunction');


let FacebookHomeInterface = function(driver){
    this.seleniumFunction = new SeleniumFunction(driver);
    
    this.getMarketplaceEl = async () => {
       let el = await this.seleniumFunction.findById('navItem_1606854132932955');
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

module.exports = FacebookHomeInterface;