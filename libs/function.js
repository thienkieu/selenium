import fs from 'fs';
import request from 'request';

const writeScreenshot = (data, name) => {
    name = name || 'ss.png';
    let screenshotPath = 'C:\\selenium_local_map\\';
    fs.writeFileSync(screenshotPath + name, data, 'base64');
};

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

const downloadImage = (url, filename, callback) => {
  request.head(url, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}

const saveImage = (path, productInfo) => {
    //console.log(productInfo);
    for(let i = 0; i < productInfo.length; i++) {
        let imageUrls = productInfo[i].images;
        let t = makeFileName(productInfo[i].title.replace(/(\r\n|\n|\r)/gm, "").toLowerCase().replace(/ /g, ''));

        if (!fs.existsSync(path+t)){
          fs.mkdirSync(path+t);
        }
        for(let j =0 ;j < imageUrls.length; j++) {
          downloadImage(imageUrls[j],path+t+'/image'+Date.now()+(j +1)+'.png', function(){});
        }

      }
}

const hashCode = (value) => {
    var hash = 0, i, chr;
    for (i = 0; i < value.length; i++) {
        chr   = value.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

let meta = [
    {
        key: ['ý','Ý'],
        to: 'y'
    },
    {
        key: ['ũ','ụ','ư','ữ', 'ự', 'ù', 'ú', 'û', 'ü', 'Ü', 'Û', 'Ú', 'Ù', 'Ư'],
        to: 'u'
    },
    {
        key: ['ờ','ỏ','ộ','ỏ','ơ', 'ợ','ổ','ồ', 'ố','ò', 'ó', 'ô', 'õ', 'ö', 'ð', 'Ö', 'Õ','Ố', 'Ô', 'Ó', 'Ò', 'Ồ'],
        to: 'o'
    },
    {
        key: ['ñ', 'Ñ'],
        to: 'n'
    },
    {
        key:['ĩ','ỉ', 'ï', 'î', 'í', 'ì', 'ị','Ï', 'Î', 'Í', 'Ì','Ỉ'],
        to: 'i'
    },
    {
        key: ['ể','ẹ','ễ', 'ệ','ề', 'ë', 'ê','é', 'è', 'Ë', 'Ê', 'É', 'È', 'ế', 'Ế'],
        to: 'e'
    },
    {
        key: ['ẫ','ả', 'ã', 'ấ', 'ầ', 'ă', 'ắ', 'ằ', 'ạ', 'ặ', 'ậ','ẩ', 'å', 'ä', 'ã', 'â', 'á', 'à', 'Å', 'Ä', 'Ã', 'Â', 'Á', 'À', 'Ă','Ạ'],
        to: 'a'
    },
    {
        key: ['đ','Ð'],
        to: 'd'
    }
];

function getCurrentDateTime() {
    let date = new Date();
    return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;

    let format =  new Date().toLocaleString();
    console.log(format);
    return format.replace(/\//gi,'_');
}

function makeFileName(title) {
    let ret = '';

    for(let i = 0; i < title.length; i++) {
        let exist = false;
        //console.log(title[i]);
        for(let j = 0; j < meta.length; j ++) {
            if (meta[j].key.includes(title[i])) {
                ret += meta[j].to;
                exist = true;
                break;
            }
        }
        if (exist === false) {
            ret += title[i];
        }
    }

    return ret;
}


export {
  sleep,
  hashCode,
  downloadImage,
  saveImage,
  writeScreenshot,
  getCurrentDateTime,
}
