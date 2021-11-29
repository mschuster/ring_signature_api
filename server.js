const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const lrs = require("lrs")
const app = express();
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));


app.post('/lrs/keygen', (req, res) => {
    var request = JSON.parse(JSON.stringify(req.body))
    let userList = []
    request["userList"].forEach(element => {
        var newUser = lrs.gen()
        userList.push(newUser)
    });
    return res.send(userList)
})

app.post('/lrs/sign', (req, res) => {
    var request = JSON.parse(JSON.stringify(req.body))
    var group = (request["userList"].map((m) => m.publicKey))
    return res.send(lrs.sign(group, request["signer"], request["msg"]))
})

app.post('/lrs/verify', (req, res) => {
    var request = JSON.parse(JSON.stringify(req.body))
    var group = (request["userList"].map((m) => m.publicKey))
    return res.send(lrs.verify(group, request['sig'], request['msg']))
})

app.post('/lrs/link', (req, res) => {
    var request = JSON.parse(JSON.stringify(req.body))
    return res.send(lrs.link(request['sign1'], request['sign2']))
})

let PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
