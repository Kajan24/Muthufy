import home from '../assets/home.svg'
import search from '../assets/search.svg'
import folder from '../assets/folder.svg'
import settings from '../assets/settings.svg'
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav id='NavBar'>
            <Link to={'/'}>
                <img src={home} alt="Icon" />
            </Link>

            <Link to={'/'}>
                <img src={search} alt="Icon" />
            </Link>
            <Link to={'/'}>
                <img src={folder} alt="Icon" />
            </Link>
            <Link to={'/'}>
                <img src={settings} alt="Icon" />
            </Link>
        </nav>
    )
}