import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [menu, setMenu] = useState(false);
    return (
        <nav className="main-nav">
            <div className="logo">
                <h2>INtech</h2>
            </div>
            <div className="menu"></div>
        </nav>
    );
};
export default Navbar;
