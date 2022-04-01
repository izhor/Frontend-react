import React from "react";
import logo from '../assets/LIBARAX.png';
import {Link} from 'react-router-dom';
function Navbar() {
    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-white shadow ">
                <div className="container">
                    <ul className="nav">
                        <img src={logo} style={{ height: "40px" }} />
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/book-management" className="nav-link">Books Management</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;