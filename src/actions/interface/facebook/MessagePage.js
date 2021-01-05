import ElementIdentity, { IdentityType } from '../ElementIdenity';
import Constant from '../../Constant';

class MessagePage {
  hasNewMessageLinkElementInterface = () => {
    return new ElementIdentity(IdentityType.XPath, '//div[@class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 j83agx80 mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l"]/ancestor::div[@data-testid="mwthreadlist-item"]//a', Constant.WaittingElementTime);
  }

  latestMessageOfConversationElementInterface = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[@class="j83agx80"]/span/span[@class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve"]', Constant.WaittingElementTime);
  }

  latestMessageBaseOnConversationIdElementInterface = (conversationId) => {
    return new ElementIdentity(IdentityType.XPath, '//a[@href="/messages/t/'+conversationId+'/"]//div[@class="j83agx80"]/span/span[@class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve"]', Constant.WaittingElementTime);
  }

  messageList = () => {
    return new ElementIdentity(IdentityType.XPath, '//div[@data-testid="MWJewelThreadListContainer"]//a', Constant.WaittingElementTime);
  }

  latestNewMessage = () => {
    return new ElementIdentity(IdentityType.XPath, './/span[@class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve"]', Constant.WaittingElementTime);
  }

  textElementMessage = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[@class="j83agx80"]/span[position()=1]/span', Constant.WaittingElementTime);
  }
  
  newMessageItem = () => {
    return new ElementIdentity(IdentityType.XPath, './/div[@class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 j83agx80 mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l"]/ancestor::div[@data-testid="mwthreadlist-item"]', Constant.WaittingElementTime);
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
