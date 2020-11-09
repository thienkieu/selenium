import InterfaceResolve from '../../interface/InterfaceResolve';
import SellingProduct from '../../interface/zalo/SellingProduct';

class Product {
    constructor(driver) {
        this.sellingProduct = new SellingProduct();
        this.driver = driver;
        this.products = [];
    }

    getLatestProduct = async () => {
        let latestInterface = this.sellingProduct.latestProduct();
        let container = await InterfaceResolve.Single(latestInterface, null, this.driver);

        let senderNameInterface = this.sellingProduct.senderName();
        let senderEl = await InterfaceResolve.Single(senderNameInterface, container, this.driver);
        if (senderEl) return container;

        return null;
    }

    saveProduct = async () => {
        let itemInterface = this.sellingProduct.messageItem();
        let container = await this.getLatestProduct();
        if (!container) {
            console.log('there is not new post');
            return;
        }
        let postItems = await InterfaceResolve.Mutiple(itemInterface, container , this.driver);
        if (postItems.length > 0) {
            let index  = 0;
            while(index < postItems.length) {
                index = await this.getProductInfo(postItems, index);
            }
            console.log(this.products);
        }
    }

    addNewProduct = (images, title, size, status, price) => {
        let p = {
            images,
            title,
            size,
            status,
            price
        };

        this.products.push(p);
        console.log(this.products);
    }

    getProductInfo = async (messages, index) => {
        let images  = null;
        let size = null, title = null, status = null, price = null;
        let currentIndex = 0;
        let previousValueType = null;
        while(currentIndex < 5) { // the maximum product attribute is 5
            let i = await this.parseImageInfo(messages[currentIndex + index]);
            let text = await this.parseTextInfo(messages[currentIndex + index]);

            if (previousValueType === 'image' && i.length > 0) {
                if (title && price) {
                    this.addNewProduct(images, title, size, status, price);
                }
                return currentIndex+index;
            }

            if (previousValueType === 'text' && i.length > 0) {
                if (images) {
                    this.addNewProduct(images, title, size, status, price);
                    return currentIndex+index;
                } else {
                    this.addNewProduct(i, title, size, status, price);
                    return currentIndex+index +1;
                }

            }

            size = this.isSize(text) ? text : size;
            title  = this.isTitle(text) ? text : title;
            status = this.isStatus(text) ? text : status;
            price = this.isPrice(text) ? this.isPrice(text) : price;

            images = i.length > 0 ? images = i : images = images;

            if (i.length > 0 ) {
                previousValueType = 'image';
            } else {
                previousValueType  = 'text';
            }

            currentIndex++;
        }
    }

    parseImageInfo = async (container) => {
        let ret = [];
        let imageInterface = this.sellingProduct.image();
        let imageEls = await InterfaceResolve.Mutiple(imageInterface, container, this.driver);
        for(let imageIndex = 0; imageIndex < imageEls.length; imageIndex++) {
            let url =  await imageEls[imageIndex].getAttribute('src');
            ret.push(url);
        }

        return ret;
    }

    parseTextInfo = async (container) => {
        let textInterface = this.sellingProduct.text();
        let textEl = await InterfaceResolve.Single(textInterface, container, this.driver);
        if (textEl) {
            return await textEl.getText();
        }

        return '';
    }

    isTitle = (text) => {
        if (text.toLowerCase().includes('giày') || text.toLowerCase().includes('dép')) return text;
        return false;
    }

    isPrice = (text) => {
        if (parseInt(text)+'k' == text ||  'sale ' + parseInt(text.toLowerCase().replace('sale ', ''))+'k' == text.toLowerCase())
            return parseInt(text.toLowerCase().replace('sale ', '')) * 1000;

        return false;
    }

    isSize = (text) => {
        if (text.toLowerCase().includes('size')) return text;
        return false;
    }

    isStatus = (text) => {
        if (text.toLowerCase().includes('còn'))  return text;
        return false;
    }
}

export default Product;
