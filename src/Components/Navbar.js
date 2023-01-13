import "./navbar.css";
// import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/intech-logo.png";
const Navbar = () => {
    // const [menu, setMenu] = useState(false);
    return (
        <nav className="main-nav">
            <div className="logo">
                <img src={logo}></img>
            </div>
            <div className="menu-links">
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Home</a>
                    </li>
                </ul>
            </div>
            <div className="login-signup">
                <button className="log-in btn">Login</button>
                <button className="sign-up btn">Sign Up</button>
            </div>
        </nav>
    );
};
export default Navbar;
