const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const app = express();
// for cors policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connection URL
const url = 'mongodb://defne:A123456@ds054128.mlab.com:54128/alldata';

// Database Name
const dbName = 'alldata';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
app.get('/oneriler', async function (req, res) {
    client.connect(async function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const coll_tr = db.collection('tr2es');
        const coll_es = db.collection('es2tr');

        const q = req.query.q;
        const from = req.query.from;
        const reg = new RegExp('^' + q, 'i');
        
        if (from == 'es') {
            let r = await coll_es.find({ 'es': { $regex: reg } }).toArray();
            r = r.map(x => x.es);
            client.close();
            res.send(r);
        }
        
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('express server on ' + PORT));