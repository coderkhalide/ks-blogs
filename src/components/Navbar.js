import {
    Link
} from "react-router-dom";

import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="wrapper navbar__wrapper">
                <Link to="/" className="navbar__logo"><img src="https://1o24a1xra1h1qveyp2mvolb1-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/Loomly-Social-Media-Blog-Logo.png" alt=""/></Link>
                <div className="navbar__menus">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create">Create Blog</Link></li>
                        <li className="navbar__join"><Link to="/join">Join</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar