import axios from "axios";

const apiKey = "zjmcRSlHFUMULtZd5vYq-qgsLSrqdEdAwsB5";

export async function getSetlist(artist)
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

        const setlists = response.data["setlist"];
        let filteredSetlists = [];
        for (const setlist of setlists)
        {
            if ("tour" in setlist)
            {
                filteredSetlists.push(setlist);
            }
        }

        return filteredSetlists;
    }
    catch (error)
    {
        console.error(error);
        return null;
    }
}



