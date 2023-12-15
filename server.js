const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
require('dotenv').config();
const port = 3000;

const redUrlPath = "./redirect-urls.json"

const redirects = require('./redirect-urls.json');

app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const validToken = process.env.BEARER_TOKEN || 'defaultToken'; // Fallback, falls keine Umgebungsvariable gefunden wurde

    console.log(validToken);

    if (token !== validToken) {
      return res.status(401).send('Unauthorized');
    }

    next();
};

app.get('/entries', authenticate, (req, res) => {
    res.send(redirects);
});

app.get("/:slug", function (req, res) {
    fs.readFile(redUrlPath,"utf8",function (err,data){
        const urls = JSON.parse(data)
        try {
            slug = req.params.slug
            return res.redirect(urls[slug])
        } catch  {
            return res.status(404).send("slug does not exist.")
        }
    })
});

app.delete("/entry/:slug", function (req, res) {
    fs.readFile(redUrlPath, "utf8", function (err,data){
        const urls = JSON.parse(data)
        try {
            console.log(urls)
            if(urls.hasOwnProperty(req.params.slug)){
            delete urls[req.params.slug]
            }
            console.log(urls)
            fs.writeFile(redUrlPath,JSON.stringify(urls),(err)=>{
                console.log(err)
            })
            return res.status(200).send("deleted")
        } catch  {
            return res.status(404).send("slug does not exist.")
        }
    })

});

app.post("/entry", (req, res) => {
    const url = req.body.url;
    const slug = req.body.slug || UUID.v4();

    redirects[slug] = url;

    fs.writeFileSync(redUrlPath, JSON.stringify(redirects));

    return res.status(200).send('Entry created');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
