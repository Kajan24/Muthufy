import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import returnIcon from '../../assets/arrow.svg';

export default function Album() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`http://localhost/API/Muthufy/albums/?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAlbums(data);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleReturn = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-200 py-5">

                <div className="p-4 h-20 flex items-center justify-start">
                    <img src={returnIcon} alt="prev" className="text-3xl font-bold" onClick={handleReturn} />
                </div>
                <AlbumHeader albums={albums} />
                {albums.length > 0 && (
                    <>
                        <div className="p-4" id='albumContainer'>
                            {albums.map((album, index) => (
                                <AlbumTrack
                                    key={index}
                                    index={index + 1}
                                    id={album.id}
                                    img={album.album_cover}
                                    title={album.title}
                                    artist={album.artists}
                                />
                            ))}
                        </div>
                    </>
                )}

            </div>
            <NavBar />
        </>
    );
}
const AlbumHeader = (props) => {
    return (
        <div className="p-4 h-1/4 flex justify-between">
            <div id='forAlbumInfo'>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">{props.albums[0].albumName}</h2>
                <p>2024</p>

                <div>
                    <img src={props.albums[0].artistPP} alt="imgCover" className='h-2/4 h-100 rounded-full' />
                    <p>{props.albums[0].albumArtist}</p>
                </div>
            </div>
            <img src={props.albums[0].albumCover} alt="Album Cover" id="albumCoverAB" />

        </div>
    )
}
const AlbumTrack = (props) => {
    const navigate = useNavigate();

    const handleClickTrack = () => {
        navigate(`/player/${props.id}`);
    }
    return (
        <div className="albumTrack" onClick={handleClickTrack}>
            <div className='abid'>
                <p>{props.index}</p>
            </div>
            <div>
                <p className="text-lg sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">{props.title}</p>
                <p>{props.artist}</p>
            </div>
        </div>
    )
}
