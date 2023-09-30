import express from "express";
import bodyParser from "body-parser";
import $ from "jquery";

const app = express();
const port = 3000;

let concerts = [];

// middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/add", (req, res) => {
    let concert = req.body["concert"];
    concerts.push(concert);
    console.log(concerts);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

