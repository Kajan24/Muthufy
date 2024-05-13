import React from "react";
import Player from "@madzadev/audio-player";
import NavBar from "./NavBar";
import { red } from "@mui/material/colors";
const tracks = [
    {
        url: "http://localhost:5173/public/songs/v2v.mp3",
        title: "Nihno - Vrai de vrai",
        tags: ["Rap"],
    },
    {
        url: "http://localhost:5173/public/songs/MOWGLI.mp3",
        title: "PNL - Mowgli",
        tags: ["Rap"],
    },
    {
        url: "http://localhost:5173/public/songs/salvator.mp3",
        title: "Iss - Salvatore",
        tags: ["hardcore"],
    },
];
const Player1 = () => {
    return (
        <>
            <NavBar></NavBar>
            <div id="forPlayer">
                <Player trackList={tracks} />
            </div>
        </>
    )
}


export default Player1;