import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import playIcon from '../../assets/play.svg';
import pauseIcon from '../../assets/pause.svg';
import skipIcon from '../../assets/skip-next.svg';
import prevIcon from '../../assets/skip-prev.svg';
import returnIcon from '../../assets/arrow.svg';
import NavBar from '../../components/NavBar';

const PLAYER_STORAGE_KEY = 'player_state';

export default function Player() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { id } = useParams();
    const coverRef = useRef(null);
    const audioRef = useRef(null);
    const navigate = useNavigate();

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
                    title: track.title || 'Unknown Title',
                    tags: track.tags ? track.tags.split(',') : [],
                    cover: track.cover || 'No cover found',
                    artists: track.artists ? track.artists.split(',') : ['Unknown artist'],
                }));
                setTracks(formattedData);
                setLoading(false);

                // Définition de trackIndex après le chargement des données
                const trackIndex = parseInt(id, 10) - 1;
                if (!Number.isInteger(trackIndex) || trackIndex < 0 || trackIndex >= formattedData.length) {
                    navigate(`/player/1`);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        fetchTracks();
    }, [id, navigate]);

    useEffect(() => {
        const storedState = localStorage.getItem(PLAYER_STORAGE_KEY);
        if (storedState) {
            const { isPlaying, currentTime } = JSON.parse(storedState);
            setIsPlaying(isPlaying);
            setCurrentTime(currentTime);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify({ isPlaying, currentTime }));
    }, [isPlaying, currentTime]);

    const formatArtists = (artists) => artists.join(', ');

    const handlePlayPauseClick = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(prevState => !prevState);
    };

    const handleNextClick = () => {
        const nextId = parseInt(id, 10) === tracks.length ? 1 : parseInt(id, 10) + 1;
        navigate(`/player/${nextId}`);
    };

    const handlePrevClick = () => {
        const prevId = parseInt(id, 10) === 1 ? tracks.length : parseInt(id, 10) - 1;
        navigate(`/player/${prevId}`);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
        handleNextClick();
    };

    const handleReturn = () => {
        navigate(-1); // Utilisez navigate avec l'argument -1 pour revenir à la route précédente
    };

    const calculateProgress = () => {
        return duration ? (currentTime / duration) * 100 : 0;
    };

    const handleProgressBarClick = (event) => {
        const clickedPosition = event.clientX - event.target.getBoundingClientRect().left;
        const progressBarWidth = event.target.offsetWidth;
        const clickedTime = (clickedPosition / progressBarWidth) * duration;
        audioRef.current.currentTime = clickedTime;
        setCurrentTime(clickedTime);
    };

    const formatTime = (time) => {
        if (!isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        return '00:00';
    };

    const trackIndex = parseInt(id, 10) - 1; // Déplacer trackIndex en dehors de useEffect

    const currentTrack = tracks[trackIndex];

    return (
        <>

            <div id='Player' className="bg-gradient-to-b from-slate-50 to-slate-200">
                <img src={returnIcon} alt="prev" className="text-3xl font-bold" onClick={handleReturn} />

                {currentTrack && (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{currentTrack.title}</h1>
                        <img src={currentTrack.cover} alt="Cover" ref={coverRef} className="mb-4 rounded-lg" />
                        <div id="infoPlayer">
                            <div>
                                <h2 className="text-xl">{formatArtists(currentTrack.artists)}</h2>
                                <p className="text-gray-500">{formatTime(currentTime)} /{formatTime(duration)}</p>
                            </div>
                            <div className="w-full h-4 bg-gray-200 rounded-full" onClick={handleProgressBarClick}>
                                <div className="h-full bg-slate-800 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                            </div>
                        </div>
                        <audio autoPlay={true} src={currentTrack.url} ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} className="mb-4"></audio>

                        <div className="flex items-center mt-4" id='controllerPlayer'>
                            <img src={prevIcon} alt="prev" className="text-3xl font-bold" onClick={handlePrevClick} />
                            {isPlaying ? (
                                <img src={pauseIcon} alt="pause" className="text-3xl font-bold" onClick={handlePlayPauseClick} />
                            ) : (
                                <img src={playIcon} alt="play" className="text-3xl font-bold" onClick={handlePlayPauseClick} />
                            )}
                            <img src={skipIcon} alt="next" className="text-3xl font-bold" onClick={handleNextClick} />
                        </div>
                    </>
                )}
            </div>
            <NavBar></NavBar>
        </>
    );

}
