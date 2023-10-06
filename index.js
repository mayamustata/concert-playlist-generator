import express from "express";
import bodyParser from "body-parser";
import $ from "jquery";
import axios from "axios";
import {getSetlist} from "./get_setlist.js";

const app = express();
const port = 3000;

let artists = [];

// middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs", 
    {
        artists: artists,
    });
});

app.get("/test", (req, res) => {
    const filteredSetlists = getSetlist("Olivia Rodrigo");
    console.log(filteredSetlists);
    res.send(filteredSetlists);
});

app.post("/add", (req, res) => {
    let artist = req.body["artist"];
    artists.push(artist);
    console.log(artists);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

