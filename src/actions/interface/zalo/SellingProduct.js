import ElementIdentity, { IdentityType } from '../ElementIdenity';
import Constant from '../../Constant';

class SellingProduct {
  contentGroup = () => {
    return new ElementIdentity(IdentityType.XPath, '//div[.= "Bài đăng giày dép"]/ancestor::div[@class="msg-item "]', Constant.WaittingElementTime);
  }

  latestProduct = () => {
    return new ElementIdentity(IdentityType.XPath, '//div[@class="message-view__scroll__inner fadeInAndOut "]/div[last()]', Constant.WaittingElementTime);
  }

  senderName = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[@class="card-sender-name "][.="Thảo Carrot"]', Constant.WaittingElementTime);
  }

  messageItem = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[contains(@class, "chat-message ")]', Constant.WaittingElementTime)
  }

  image = () => {
    return new ElementIdentity(IdentityType.XPath, './/img', Constant.WaittingElementTime)
  }

  text = () => {
    return new ElementIdentity(IdentityType.XPath, './/span[@class="text"]', Constant.WaittingElementTime)
  }

}

export default SellingProduct;
