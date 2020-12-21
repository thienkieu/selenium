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

  inputSearch = () => {
    return new ElementIdentity(IdentityType.XPath, '//input[@aria-label="Tìm kiếm trên Messenger"]', Constant.WaittingElementTime);
  }

  listSearchResultMessage = () => {
    return new ElementIdentity(IdentityType.XPath, '//div[@class="bp9cbjyn nhd2j8a9 j83agx80 ni8dbmo4 stjgntxs l9j0dhe7 dwzzwef6 ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi"]/a', Constant.WaittingElementTime);
  }

  clientChatMessage = ()=> {
    return new ElementIdentity(IdentityType.XPath, '//div[@class="oo9gr5id"]', Constant.WaittingElementTime);
  }

}

export default MessagePage;
