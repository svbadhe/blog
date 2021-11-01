import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from "../Components/Dropdown";

function Header() {
    const name = window.localStorage.getItem("name");
    return (
        <div className="app-header">
            <div className="app-title">
                <Link className="navbar-home-link" to="/"><h2>Tech Blog</h2></Link>
            </div>
            <div className="app-nav-bar">
                <Link className="nav-bar-link" to="/post">Post</Link>
                {name===null? <Link className="nav-bar-link" to="/login">Login</Link>:<Dropdown/>}
                {name===null? <Link className="nav-bar-link" to="/register">Register</Link>:null}
            </div>
        </div>
    )
}

export default Header;