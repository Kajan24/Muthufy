import home from '../assets/home.svg'
import search from '../assets/search.svg'
import folder from '../assets/folder.svg'
import settings from '../assets/settings.svg'
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function NavBar() {
    const handleNotAvailable = () => {
        toast("Désolé, ce n'est pas encore disponible!", {
            icon: '👎🏾',
            style: {
                borderRadius: '5px',
                background: '#171717',
                color: '#fff',
            },
        });
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <nav id='NavBar'>
                <Link to={'/'}>
                    <img src={home} alt="Home" />
                </Link>


                <img src={search} alt="Search" onClick={handleNotAvailable} />


                <img src={folder} alt="Folder" onClick={handleNotAvailable} />


                <img src={settings} alt="Settings" onClick={handleNotAvailable} />

            </nav>
        </>
    )
}
