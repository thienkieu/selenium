let fs = require('fs');
let request = require('request');

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

module.exports = {
  sleep: sleep,
  downloadImage: downloadImage,
}
