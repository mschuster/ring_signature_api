const crypto = require('crypto');

const GetKeyPair = function () {
    var keyPair = []
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    
    keyPair.push([privateKey, publicKey])
    console.log(keyPair)

    return keyPair
}






module.exports = {
    GetKeyPair
}