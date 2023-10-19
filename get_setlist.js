import axios from "axios";

const apiKey = "zjmcRSlHFUMULtZd5vYq-qgsLSrqdEdAwsB5";

export async function getSetlists(artist)
{
    try
    {
        const response = await axios.get("https://api.setlist.fm/rest/1.0/search/setlists", {
            params: {
                artistName: artist, 
                p: 1,
            },
            headers: {
                "x-api-key": apiKey,
                Accept: "application/json",
            },
        });

        const setlists = response["data"]["setlist"];
        let filteredSetlists = [];
        
        for (const setlist of setlists)
        {
            if ("tour" in setlist)
            {
                filteredSetlists.push(setlist);
            }
        }
        console.log(filteredSetlists.length);
        return filteredSetlists;
    }
    catch (error)
    {
        console.error(error);
        return null;
    }
}

export async function getRecentSetlist(artist)
{
    let filteredSetlists = await getSetlists(artist);
    return filteredSetlists[0];
}

export async function getSetlistSongs(artist)
{
    let setlist = await getRecentSetlist(artist);
    const songs = setlist["sets"]["set"][0]["song"];
    let songNames = [];
    for (const song of songs)
    {
        songNames.push(song["name"]);
    }
    return songNames;
}
