import InterfaceResolve from '../../interface/InterfaceResolve';
import MessagePagae from '../../interface/facebook/MessagePage';
import { Key, By } from 'selenium-webdriver';
import { sleep, hashCode } from '../../../../libs/function';
import SeleniumFunction from '../../../common/SeleniumFunction';


class Message {
    constructor(driver, firebaseService, facebookInfo) {
        this.messagePage = new MessagePagae();
        this.driver = driver;        
        this.firebaseService = firebaseService;
        this.facebookInfo = facebookInfo;
        this.messagesInfo = [];
        this.latestMessages = {};
    }

    getConversationId = async (container) => {
        let linkInterface = this.messagePage.linkConverstation();
        let linkEl = await InterfaceResolve.Single(linkInterface, container, this.driver);
        let linkURL = await linkEl.getAttribute('data-href');
        let aURL = linkURL.split('?');
        aURL = aURL[0].split('/');
        return aURL[5];
    }

    replayMessage = async () => {
        let firebaseAnswer = await firebaseApp.getFilter('converstaionDetail/' + this.nodeKey + '/answers/', 'status', 'old');
        let answers = {};
        if (firebaseAnswer) {
            let keys = Object.keys(firebaseAnswer);
            for(let i = 0; i < keys.length; i++) {
                let message = firebaseAnswer[keys[i]];
                let conversationInterface = this.messagePage.converstationById(message.id);
                let conversationEl = await InterfaceResolve.Single(conversationInterface, null, this.driver);
                await conversationEl.click();

                let inputMessageInterface = this.messagePage.inputMessage();
                let inputMessageEl = await InterfaceResolve.Single(inputMessageInterface, null, this.driver);
                await inputMessageEl.sendKeys(message.message+Key.ENTER);

                let updates = {};
                updates['converstaionDetail/' + this.nodeKey + '/answers/' + hashCode(message.id)] = {
                    status: 'old'
                };
                this.firebaseService.update(updates);

            }
        }
        
    }

    getNewMessages = async () => {
            let messageListInterface = this.messagePage.messageList();
            let messageList = await InterfaceResolve.Single(messageListInterface, null, this.driver);

            let newMessgaesInterface = this.messagePage.newMessageItem();
            let newMessagesItems = await InterfaceResolve.Mutiple(newMessgaesInterface, messageList , this.driver);

            let updates = {};
            for(let newMessageItem = 0; newMessageItem < newMessagesItems.length; newMessageItem++) {
                let newMessageValueInterface = this.messagePage.latestNewMessage();
                let latestMessgeValue = await InterfaceResolve.Single(newMessageValueInterface, newMessagesItems[newMessageItem] , this.driver);
                let m = await latestMessgeValue.getText();
                let sender = await latestMessgeValue.getText();
                let conversationId = await this.getConversationId(newMessagesItems[newMessageItem]);
                
                let time = new Date().getTime();
                if (latestMessages[conversationId] != m) {
                    updates['converstaionSummary/' + hashCode(conversationId)] = {
                        m,
                        sender,
                        ...this.facebookInfo,
                        conversationId
                    };

                    updates['converstaionDetail/' + hashCode(conversationId) + '/' + time] = {
                        m,
                        sender,
                        ...this.facebookInfo,
                        conversationId
                    };

                    this.latestMessages[conversationId] = m;
                }
            }

            this.firebaseService.update(updates);

    }
}

export default Message;
