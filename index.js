import express from "express";
import bodyParser from "body-parser";
import $ from "jquery";
import axios from "axios";
import {getSetlists, getRecentSetlist, getSetlistSongs} from "./get_setlist.js";

const app = express();
const port = 3000;

let setlists = {};

// middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    res.render("index.ejs", 
    {
        setlists: setlists,
    });
});

app.get("/test", async (req, res) => {
    const songs = await getSetlistSongs("Olivia Rodrigo");
    res.send(songs);
});

app.post("/add", async (req, res) => {
    let artist = req.body["artist"];
    let songs = await getSetlistSongs(artist);
    setlists[artist] = songs;
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

