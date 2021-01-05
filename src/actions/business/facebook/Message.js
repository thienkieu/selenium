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
        let linkURL = await container.getAttribute('href');
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

    getAnswerMessage = async () => {
        let conversationIds = Object.keys(this.latestMessages);
        let updates = {};
        for(let i = 0; i < conversationIds.length; i++) {
            let conversationId = conversationIds[i];

            let latestElementInterface = this.messagePage.latestMessageBaseOnConversationIdElementInterface(conversationId);
            let textElement = await InterfaceResolve.Single(latestElementInterface, null, this.driver );
            let fullMessage = await textElement.getText();
            if (fullMessage != this.latestMessages[conversationId]) {
                let time = new Date().getTime();
                let mArray = fullMessage.split(':');
                let m = "";
                let sender = "Other";
                if (mArray && mArray.length == 1) {
                    m = mArray[0];
                }
                if (mArray && mArray.length == 2) {
                    m = mArray[1];
                    sender = mArray[0];
                }

                updates['converstaionDetail/' + hashCode(conversationId) + '/' + time] = {
                    m,
                    sender,
                    ...this.facebookInfo,
                    conversationId
                };

                this.latestMessages[conversationId] = fullMessage;
            }
        }

        if (Object.keys(updates).length > 0) {
            this.firebaseService.update(updates);
        }

    }

    getImageUrl = async () => {
        
    }

    getNewMessages = async () => {
        let hasNewMessageElementInterface = this.messagePage.hasNewMessageLinkElementInterface();
        let listNewMessages = await InterfaceResolve.Mutiple(hasNewMessageElementInterface, null, this.driver);

        let updates = {};
        for(let newMessageItem = 0; newMessageItem < listNewMessages.length; newMessageItem++) {
            let textElementInterface = this.messagePage.latestMessageOfConversationElementInterface();
            let textElement = await InterfaceResolve.Single(textElementInterface, listNewMessages[newMessageItem], this.driver );

            let fullMessage = await textElement.getText();
            let mArray = fullMessage.split(':');
            let m = "";
            let sender = "Other";
            if (mArray && mArray.length == 1) {
                m = mArray[0];
            }
            if (mArray && mArray.length == 2) {
                m = mArray[1];
                sender = mArray[0];
            }
            
            let conversationId = await this.getConversationId(listNewMessages[newMessageItem]);
            
            let time = new Date().getTime();
            if (this.latestMessages[conversationId] != fullMessage) {
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

                this.latestMessages[conversationId] = fullMessage;
            }
        }
        if (Object.keys(updates).length > 0) {
            this.firebaseService.update(updates);
        }
        
    }

    processMessage = async () => {
        this.getNewMessages();
        this.getAnswerMessage();

        setTimeout(async() => {
            this.processMessage();
        }, 5000);
    }
}

export default Message;
