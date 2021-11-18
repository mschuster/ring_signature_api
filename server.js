const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const crypto = require('crypto');
const keyGen = require("./keyGen.js")
const lrs = require("lrs")

const app = express();

app.use(express.json())

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));


app.post('/gen', (req, res) => {
    /* logic for generating and public and private keys
        @params
        uList = user List
    */
    
    var result = JSON.parse(JSON.stringify(req.body))

    var userKeyList = []

    result["userList"].forEach(element => {
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
        userKeyList.push([element, privateKey, publicKey])
    });

    return res.send(userKeyList)
});

app.post('/lrs/keygen', (req, res) => {
    
    var result = JSON.parse(JSON.stringify(req.body))

    let userList = []

    result["userList"].forEach(element => {
        var newUser = lrs.gen()
        userList.push(newUser)
    });
    return res.send(userList)
})

app.post('/lrs/sign', (req, res) => {
    
    var request = JSON.parse(JSON.stringify(req.body))
    var group = (request["userList"].map((m) => m.publicKey))
    console.log(group)
    return res.send(lrs.sign(group, request["signer"], request["msg"]))
})

app.post('/lrs/verify', (req, res) => {

    var result = JSON.parse(JSON.stringify(req.body))
    return res.send(lrs.verify(result["group"], result['sig'], result['msg']))
})

app.post('/lrs/link', (req, res) => {
    var result = JSON.parse(JSON.stringify(req.body))
    return res.send(lrs.link(result['sign1'], result['sign2']))
})

app.post('/sign', (req, res) => {
    /* logic for signing and message
        @params
        sKey = secret Key
        msg = message
        pList = public Key list
        tag = 
    */

    const sKey = req.body.sKey
    const msg = req.body.msg
    const pList = req.body.pList
    const tag = req.body.tag
    const sig = '0'

    return res.send(sig);
});

app.post('/verify', (req, res) => {
    /* logic for verifing signature and message
        @params
        sig = signatur
        msg = message
        pList = public key list
        tag = 
    */

    const sig = req.body.sig
    const msg = req.body.msg
    const pList = req.body.pList
    const tag = req.body.tag

    const result = false


    return res.send(result);
});


let PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
