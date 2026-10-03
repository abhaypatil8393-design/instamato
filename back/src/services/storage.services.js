const ImageKit = require("imagekit");
require('dotenv').config();



const imagekit2 = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadfile(file , fileName){
    const result =  await imagekit2.upload({
        file: file,
        fileName: fileName
    })

    console.log(result);
    return result;
}

module.exports = {
     uploadfile
     };