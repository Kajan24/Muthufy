import home from '../assets/home.svg'
import search from '../assets/search.svg'
import folder from '../assets/folder.svg'
import settings from '../assets/settings.svg'
export default function NavBar() {
    return (
        <nav id='NavBar'>
            <a href="#">
                <img src={home} alt="HomeIcon" />
            </a>
            <a href="#">
                <img src={search} alt="HomeIcon" />
            </a>
            <a href="#">
                <img src={folder} alt="HomeIcon" />
            </a>
            <a href="#">
                <img src={settings} alt="HomeIcon" />
            </a>
        </nav>
    )
}