import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import imageUrl from '../../assets/ohg.jpg'
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { dark } from '@mui/material/styles/createPalette';


export default function Home() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost/API/Muthufy/bestTracks/');
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
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        fetchTracks();
    }, []);


    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('http://localhost/API/Muthufy/artists/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setArtists(data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchArtists();
    }, []);



    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('http://localhost/API/Muthufy/albums/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setAlbums(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchAlbums();
    }, []);


    return (
        <>
            <NavBar></NavBar>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-200 py-5">
                <div className="flex items-baseline mt-5 justify-between p-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                        Home
                    </h2>
                    <img className="w-10 h-10 rounded-full" src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' alt="Rounded avatar"></img>
                </div>
                <div className="hmContent">

                    <div className="bestSongs">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Salut, Kajan 👋
                        </h2>
                        <div id='forBestSongs'>
                            {tracks.map((track) => (
                                <BestSongsItem key={track.id} id={track.id} img={track.cover} title={track.title} />
                            ))}
                        </div>
                    </div>

                    <div className="forScrollSongs">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Artiste en tendance
                        </h2>
                        <div className='trendingAlbum overflow-x-scroll'>
                            {artists.map((artist) => (
                                <TrendingArtist key={artist.id} songName={artist.name} img={artist.profile_photo} />
                            ))}
                        </div>
                    </div>


                    <div className="forScrollSongs">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Albums recommandés
                        </h2>
                        <div className='trendingAlbum overflow-x-scroll'>
                            {albums.map((album) => (
                                <RequestAlbum key={album.id} img={album.cover} songName={album.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function BestSongsItem(props) {
    const navigate = useNavigate();

    const handleClickTrack = () => {
        navigate(`/player/${props.id}`);
    }

    return (
        <div className="itemBestSong" onClick={handleClickTrack}>
            <img src={props.img} alt="imgCover" className='h-full mr-3 h-100' />
            <p>{props.title}</p>
        </div>
    )
}


function TrendingArtist(props) {
    return (
        <div className="itemTredingAlbum">
            <img src={props.img} alt="imgCover" className='h-3/4 h-100 rounded-full' />
            <p>{props.songName}</p>
        </div>
    )
}

function RequestAlbum(props) {

    const navigate = useNavigate();

    const handleAlbum = () => {
        navigate(`/album/${props.id}`);
    }

    return (
        <div className="itemTredingAlbum" onClick={handleAlbum}>
            <img src={props.img} alt="imgCover" className='h-3/4 h-100' />
            <p>{props.songName}</p>
        </div>
    )
}
