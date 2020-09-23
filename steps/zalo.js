const fs = require('fs');
const ZaloInterface = require('../interfaces/zalo');
const SeleniumFunction = require('../libs/SeleniumFunction');
const { sleep, downloadImage } = require('../libs/function');

let Zalo = async (driver) => {

    let zaloInterface = new ZaloInterface(driver);
    let seleniumFunction = new SeleniumFunction(driver);

    await seleniumFunction.visit("https://id.zalo.me/account?continue=https://chat.zalo.me");
    //let otherLogin = await zaloInterface.getOtherLoginMethod();
    //await otherLogin.click();

    let loginQACodeEl = await zaloInterface.getLoginQACodeEl();
    await loginQACodeEl.click();
    await sleep(15000);
    let groupContentEl = await zaloInterface.getContentGroupEl();
    await groupContentEl.click();
    await sleep(15000);

    let chatContainerEls = await zaloInterface.getMessageContainerEl();
    let productInfo = [];
    for(let idx = 0; idx < chatContainerEls.length; idx++) {
      let postInfoEl = chatContainerEls[idx];
      let postItems =  await seleniumFunction.findElementsByXPaths('.//div[contains(@class, "chat-message ")]', postInfoEl);
      let mIndex = 0;
      let title = '';
      let price = '';
      let status = '';
      let size = '';
      let images = [];
      while(mIndex < postItems.length) {
        /*
          1. download photo
          2. get title
          3. get price
          4. get size
        */

        let messageItem = postItems[mIndex];
        mIndex++;
        let classEl = await messageItem.getAttribute("class");
        if (classEl === 'chat-message  rotate-container ') {
          let imageEls = await seleniumFunction.findElementsByXPaths('.//img', messageItem);
          for(let imageIndex = 0; imageIndex < imageEls.length; imageIndex++) {
            let url =  await imageEls[imageIndex].getAttribute('src');
            images.push(url);
          }

          while (mIndex < postItems.length) {
            messageItem = postItems[mIndex];
            classEl = await messageItem.getAttribute("class");
            if (classEl === 'chat-message wrap-message rotate-container ') {

              let textEl = await seleniumFunction.findByXPath('.//span[@class="text"]', messageItem);
              if (textEl) {
                let text = await textEl.getText();
                if (text.toLowerCase().includes('giày') || text.toLowerCase().includes('dép')) {
                  if (!title) {
                    title = text;
                  }else {
                    break;
                  }

                }
                if (parseInt(text)+'k' == text ||  'sale ' + parseInt(text.toLowerCase().replace('sale ', ''))+'k' == text.toLowerCase()) {
                  price = parseInt(text.toLowerCase().replace('sale ', '')) * 1000;
                }

                if (text.toLowerCase().includes('còn')) {
                  status = text;
                }

                if (text.toLowerCase().includes('size')) {
                  size = text;
                }
              } else {
                let imgEl = await seleniumFunction.findByXPath('.//img[@class="chat-message-picture chat-message-picture__photo "]', messageItem);
                if (imgEl) {
                  let url = await imgEl.getAttribute('src');
                  images.push(url);
                }
              }
              mIndex++;
            } else {
              break;
            }
          }


          if (price && title) {
            productInfo.push({
              title,
              price,
              size,
              images,
              status,
            });
          }

          title = '';
          price = '';
          size = '';
          images = [];
          status = '';

        }

        if (classEl === 'chat-message wrap-message rotate-container ') {
          while (mIndex < postItems.length) {
            classEl = await messageItem.getAttribute("class");
            if (classEl === 'chat-message wrap-message rotate-container ') {

              let textEl = await seleniumFunction.findByXPath('.//span[@class="text"]', messageItem);
              if (textEl) {
                let text = await textEl.getText();
                console.log(text);
                if (text.toLowerCase().includes('giày') || text.toLowerCase().includes('dép')) {
                  if (!title) {
                    title = text;
                  }else {
                    break;
                  }

                }

                if (parseInt(text)+'k' == text ||  'sale ' + parseInt(text.toLowerCase().replace('sale ', ''))+'k' == text.toLowerCase()) {
                  price = parseInt(text.toLowerCase().replace('sale ', '')) * 1000;
                }

                if (text.toLowerCase().includes('còn')) {
                  status = text;
                }

                if (text.toLowerCase().includes('size')) {
                  size = text;
                }
              } else {
                let imgEl = await seleniumFunction.findByXPath('.//img[@class="chat-message-picture chat-message-picture__photo "]', messageItem);
                if (imgEl) {
                  let url = await imgEl.getAttribute('src');
                  images.push(url);
                }
              }
              mIndex++;
              messageItem = postItems[mIndex];
            } else {
              break;
            }
          }

          if (classEl === 'chat-message  rotate-container ') {
            let imageEls = await seleniumFunction.findElementsByXPaths('.//img', messageItem);
            for(let imageIndex = 0; imageIndex < imageEls.length; imageIndex++) {
              let url = await imageEls[imageIndex].getAttribute('src');
              images.push(url);
            }
          }

          if (price && title) {
            productInfo.push({
              title,
              price,
              size,
              images,
              status,
            });
          }

          title = '';
          price = '';
          size = '';
          images = [];
          status = '';

          mIndex++;
        }

      }
    }

    for(let i = 0; i < productInfo.length; i++) {
      let imageUrls = productInfo[i].images;
      if (!fs.existsSync('download/'+productInfo[i].title)){
        fs.mkdirSync('download/'+productInfo[i].title);
      }
      for(let j =0 ;j < imageUrls.length; j++) {
        downloadImage(imageUrls[j],'download/'+productInfo[i].title+'/'+j+'.png', function(){});
      }

    }
  return productInfo;
}

module.exports = Zalo;
