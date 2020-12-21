import InterfaceResolve from '../../interface/InterfaceResolve';
import MessagePagae from '../../interface/facebook/MessagePage';
import { sleep, hashCode } from '../../../../libs/function';
import SeleniumFunction from '../../../common/SeleniumFunction';

class Message {
    constructor(driver, firebaseService, facebookInfo, nodeKey) {
        this.messagePage = new MessagePagae();
        this.driver = driver;
        this.nodeKey = nodeKey;
        this.firebaseService = firebaseService;
        this.facebookInfo = facebookInfo;
        this.messagesInfo = [];
    }

    getConversationId = async (container) => {
        let linkInterface = this.messagePage.linkConverstation();
        let linkEl = await InterfaceResolve.Single(linkInterface, container, this.driver);
        let linkURL = await linkEl.getAttribute('data-href');
        let aURL = linkURL.split('?');
        aURL = aURL[0].split('/');
        return aURL[5];
    }


    getNewMessages = async () => {

            let messageListInterface = this.messagePage.messageList();
            let messageList = await InterfaceResolve.Single(messageListInterface, null, this.driver);

            let newMessgaesInterface = this.messagePage.newMessageItem();
            let newMessagesItems = await InterfaceResolve.Mutiple(newMessgaesInterface, messageList , this.driver);

            for(let newMessageItem = 0; newMessageItem < newMessagesItems.length; newMessageItem++) {
                let newMessageValueInterface = this.messagePage.latestNewMessage();
                let latestMessgeValue = await InterfaceResolve.Single(newMessageValueInterface, newMessagesItems[newMessageItem] , this.driver);
                let m = await latestMessgeValue.getText();
                let conversationId = await this.getConversationId(newMessagesItems[newMessageItem]);
                let updates = {};

                updates['converstaionSummary/' + this.nodeKey + '/conversations/' + hashCode(conversationId)] = {
                    message: m,
                    id: conversationId
                };

                let time = new Date().getTime();
                updates['converstaionDetail/' + this.nodeKey + '/conversations/' + hashCode(conversationId)+'/' + time] = {
                    message: m
                };

                this.firebaseService.update(updates);
                newMessagesItems[newMessageItem].click();
            }

    }
}

export default Message;
