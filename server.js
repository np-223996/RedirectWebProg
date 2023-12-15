const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 3000;

const redirects = require('./redirect-urls.json');

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

app.post("/entry", authenticate, (req, res) => {
    const url = req.body.url;
    const slug = req.body.slug || UUID.v4();

    redirects[slug] = url;

    fs.writeFileSync(redUrlPath, JSON.stringify(redirects));

    return res.status(200).send('Entry created');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
