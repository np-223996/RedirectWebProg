const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;



app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);

app.get("/profs", async function (req, res) {
    try{
        await client.connect()
        const database = client.db("ratings");
        const collection = database.collection("profrating");
        const results = await collection.find().sort({id:1}).toArray();
        const myArray = results.map((document) => document);
        res.end(JSON.stringify(myArray))
        await client.close()
    }catch{
        res.status=500
    }
});

app.post("/profs", async function (req, res) {
    try{
        await client.connect()
        const database = client.db("ratings");
        const collection = database.collection("profrating");
        const doc={
            id: id,
            name: req.body.name,
            rating: req.body.rating,
        }
        id++;
        const result = await collection.insertOne(doc);
        const results = await collection.find().sort({id:1}).toArray();
        const myArray = results.map((document) => document);
        res.end(JSON.stringify(myArray))
    }catch{
        res.status=500
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
