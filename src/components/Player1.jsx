import React, { useState, useEffect } from "react";
import Player from "@madzadev/audio-player";
import NavBar from "./NavBar";

const Player1 = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost/API/Muthufy/tracks/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const formattedData = data.map(track => ({
                    id: track.id || 'Unknown id',
                    url: track.url || 'Unknown track',
                    title: `${track.title || 'Unknown Title'}`,
                    tags: track.tags ? track.tags.split(',') : [],
                    cover: track.cover || 'No cover found',
                    artist_name: track.name || 'Unknown artist',
                }));
                setTracks(formattedData);
                setLoading(false); // Indique que les pistes ont été chargées
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        fetchTracks();
    }, []);

    return (
        <>
            <NavBar />
            {loading ? (
                <div>fdsfdsdsfr432r32sdf uzrfgsfz...</div>
            ) : (
                <div id="forPlayer">
                    <Player trackList={tracks} />
                </div>
            )}
        </>
    );
};

export default Player1;
