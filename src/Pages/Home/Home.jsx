import { useState, useEffect } from 'react';
import { auth } from "../../db/firebase";
import { signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import imageUrl from '../../assets/ohg.jpg'
import NavBar from '../../components/NavBar';

export default function Home() {
    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log('déconnexion réussie'))
            .catch((error) => console.log(error))
    }

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
                            <BestSongsItem img={imageUrl} />
                            <BestSongsItem img={imageUrl} />
                            <BestSongsItem img={imageUrl} />
                            <BestSongsItem img={imageUrl} />
                            <BestSongsItem img={imageUrl} />
                            <BestSongsItem img={imageUrl} />
                        </div>
                    </div>

                    <div className="forScrollSongs">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Artiste en tendance
                        </h2>
                        <div className='trendingAlbum overflow-x-scroll'>
                            <TredingAlbum img={imageUrl} songName="Oh girl" />
                            <TredingAlbum img={imageUrl} songName="Oh girl" />
                            <TredingAlbum img={imageUrl} songName="Oh girl" />
                            <TredingAlbum img={imageUrl} songName="Oh girl" />
                            <TredingAlbum img={imageUrl} songName="Oh girl" />
                        </div>
                    </div>


                    <div className="forScrollSongs">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Albums recommandés
                        </h2>
                        <div className='trendingAlbum overflow-x-scroll'>
                            <RequestAlbum img={imageUrl} songName="Oh girl" />
                            <RequestAlbum img={imageUrl} songName="Oh girl" />
                            <RequestAlbum img={imageUrl} songName="Oh girl" />
                            <RequestAlbum img={imageUrl} songName="Oh girl" />
                            <RequestAlbum img={imageUrl} songName="Oh girl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function BestSongsItem(props) {
    return (
        <div className="itemBestSong">
            <img src={props.img} alt="imgCover" className='h-full mr-3 h-100' />
            <p>Oh Girl</p>
        </div>
    )
}


function TredingAlbum(props) {
    return (
        <div className="itemTredingAlbum">
            <img src={props.img} alt="imgCover" className='h-3/4 h-100 rounded-full' />
            <p>{props.songName}</p>
        </div>
    )
}

function RequestAlbum(props) {
    return (
        <div className="itemTredingAlbum">
            <img src={props.img} alt="imgCover" className='h-3/4 h-100' />
            <p>{props.songName}</p>
        </div>
    )
}