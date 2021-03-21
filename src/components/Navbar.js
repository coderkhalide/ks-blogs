import { useDispatch, useSelector } from "react-redux";
import {
    Link
} from "react-router-dom";

import '../styles/Navbar.css';
import { logout, selectUser } from '../features/userSlice';
import { useState } from "react";
function Navbar() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div className="navbar">
            <div className="wrapper navbar__wrapper">
                <Link to="/" className="navbar__logo"><img src="https://1o24a1xra1h1qveyp2mvolb1-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/Loomly-Social-Media-Blog-Logo.png" alt="KS Logo"/></Link>
                <div className="navbar__menus">
                    <img src="https://www.contentformula.com/blog/wp-content/uploads/2016/06/hamburger-menu.png" className="mobileMenu" alt="Menu icon" onClick={() => setIsHidden(false)}/>
                    <ul className={`navbar__ul ${isHidden ? 'hidden' : ''}` }>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create">Create Blog</Link></li>
                        {!user ? (<li className="navbar__join"><Link to="/join">Join</Link></li>) :
                            (<li className="navbar__join" onClick={() => dispatch(logout())}><Link to="/logout">Log out</Link></li>)
                        }
                    </ul>
                </div>
            </div>
            <div className={`navbar__backdrop ${isHidden ? 'hidden' : ''}`} onClick={() => setIsHidden(true)}></div>
        </div>
    )
}

export default Navbar