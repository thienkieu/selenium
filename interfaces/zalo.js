const SeleniumFunction = require('../libs/SeleniumFunction');


let ZaloInterface = function(driver){
    this.seleniumFunction = new SeleniumFunction(driver);
    this.getContentGroupEl = async () => {
      let groupContent = await this.seleniumFunction.findByXPath('//div[.= "bài đăng bán hàng market"]/ancestor::div[@class="msg-item "]', null, 60000);
      return groupContent;
    }

    this.getOtherLoginMethod = async () => {
      let otherLogin = await this.seleniumFunction.findByXPath('//a[.="Hoặc đăng nhập bằng tài khoản khác"]');
      return otherLogin;
    }

    this.getLoginQACodeEl =  async () => {
      let loginQACodeEl = await this.seleniumFunction.findByXPath('//a[.="Với Mã QR"]');
      return loginQACodeEl;
    }

    this.getMessageContainerEl = async () => {
       let els = await this.seleniumFunction.findElementsByXPaths('//div[@class="chat-item flx "]');
       let rets = [];
       for(let i = 0; i < els.length; i++) {
         let senderName = await this.seleniumFunction.findElementsByXPaths('.//div[.="Thảo Carrot"]', els[i]);
         let messages = await this.seleniumFunction.findElementsByXPaths('.//div[contains(@class, "chat-message ")]');
         if (senderName && senderName.length == 1 && messages && messages.length >= 3) {
            let hasPhotoElement = false;
            let hasTitleElement = false;
            let hasPriceElement = false;
            for(let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
                let classEl = await messages[messageIndex].getAttribute("class");
                if (classEl.includes('chat-message  rotate-container ')) {
                    hasPhotoElement = true;
                }

                let text = await messages[messageIndex].getText();
                text = text.toLowerCase();
                if (text.includes('giày') || text.includes('dép')) {
                    hasTitleElement = true;
                }
                let price = parseInt(text);
                if (text == price+'k') {
                    hasPriceElement = true;
                }

                if (hasPriceElement && hasTitleElement && hasPhotoElement) {
                    rets.push(els[i])
                    break;
                }
            }
         }
       }
       return rets;
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

module.exports = ZaloInterface;
