const SeleniumFunction = require('../libs/SeleniumFunction');


let MessagerInterface = function(driver){
    this.seleniumFunction = new SeleniumFunction(driver);

    this.uploadImageFile = async () => {
       let el = await this.seleniumFunction.findByCssSelector('input[type="file"]');
       return el;
    };

    this.uploadVideoFile = async () => {
        let el = await this.seleniumFunction.findByCssSelector('input[type="file"]');
        return el;
     };

    this.getProductType = async () => {
        let el = await this.seleniumFunction.findByCssSelector('div[class="dati1w0a hv4rvrfc tr9rh885"] div[class="g5ia77u1 buofh1pr d2edcug0 l9j0dhe7"]');
        return el;
    }

    this.selectProductTypeItem = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.= "Quần áo & giày dép nữ"]');
        return el;
    }

    this.getTitleEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Tiêu đề"]/input');
        return el;
    }

    this.getPriceEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Giá"]/input');
        return el;
    }

    this.getStatusEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[@aria-label="Tình trạng"]');
        return el;
    }

    this.getNewStatusEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[@role="menuitemradio"][.="Mới"]');
        return el;
    }

    this.getBranchEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Thương hiệu"]/input');
        return el;
    }

    this.getSizeEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Kích thước"]/input');
        return el;
    }

    this.getDescriptionEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Mô tả"]/textarea');
        return el;
    }

    this.getLocationEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Vị trí"]/input');
        return el;
    }

    this.getLocationContainerEl = async () => {
        let el = await this.seleniumFunction.findByXPath('//div[.="Vị trí"][@class=""]');
        return el;
    }

    this.selectLocationItemEl = async (location) => {
        let el = await this.seleniumFunction.findByXPath('//div[.="'+location+'"]');
        return el;
    }

    this.selectOtherGroupEl = async (name) => {
        let el = await this.seleniumFunction.findByXPath('//div[.="'+name+'"]/../../../../../..');
        return el;
    }

    this.getNextButton = async (name) => {
        let el = await this.seleniumFunction.findByXPath('//div[@aria-label="'+name+'"]');
        return el;
    }

}

module.exports = MessagerInterface;
