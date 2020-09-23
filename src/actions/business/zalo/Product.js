import InterfaceResolve from '../../interface/InterfaceResolve';
import SellingProduct from '../../interface/zalo/SellingProduct';

class Product {
    constructor(driver) {
        this.sellingProduct = new SellingProduct();
        this.driver = driver;
    }

    getLatestProduct = async () => {
        let latestInterface = this.sellingProduct.latestProduct();
        let container = await InterfaceResolve.Single(latestInterface, null, this.driver);
        return container;
    }

    saveProduct = async () => {
        let itemInterface = this.sellingProduct.messageItem();
        let container = await this.getLatestProduct();
        let postItems = await InterfaceResolve.Mutiple(itemInterface, container , this.driver);
        if (postItems.length === 1) {
            let text = await postItems[0].getText();
            console.log(text);
        }
    }
}

export default Product;
