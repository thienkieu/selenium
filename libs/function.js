import fs from 'fs';
import request from 'request';

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

const hashCode = (value) => {
    var hash = 0, i, chr;
    for (i = 0; i < value.length; i++) {
        chr   = value.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

export {
  sleep,
  hashCode,
  downloadImage,
}
