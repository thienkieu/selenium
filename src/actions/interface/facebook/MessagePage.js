import ElementIdentity, { IdentityType } from '../ElementIdenity';
import Constant from '../../Constant';

class MessagePage {
  messageList = () => {
    return new ElementIdentity(IdentityType.XPath, '//ul[@role="grid"]', Constant.WaittingElementTime);
  }

  latestNewMessage = () => {
    return new ElementIdentity(IdentityType.XPath, './/div/a/div/div[@class="_1qt4 _7vuo _5l-m"]/div[@class="_1qt5 _6zkd _5l-3"]/span[@class="_1htf _6zke"]', Constant.WaittingElementTime);
  }

  newMessageItem = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[@class="_6zv_"]/ancestor::li', Constant.WaittingElementTime);
  }

  linkConverstation = () => {
    return new ElementIdentity(IdentityType.XPath, './/a[@role="link"]', Constant.WaittingElementTime);
  }

}

export default MessagePage;
