import React from 'react'
import { useHistory, useLocation } from 'react-router'

function Dropdown() {
    const history = useHistory();
    const location = useLocation();

    function select(e){
        let value = e.target.value;
        if (value === "1"){
            history.push("/myposts");
        } else if (value === "0"){
            history.push("/profile");
        } else if (value === "-1"){
            window.localStorage.clear();
            if (location.pathname ==="/"){
                history.go(0);
            } else {
                history.push("/");
            }
        }
    }

    return (
        <div className="dropdown">
            <select defaultValue="2" onChange={select}>
                <option value="2">{window.localStorage.getItem("name")}</option>
                <option value="1">My Posts</option>
                <option value="0">Profile</option>
                <option value="-1">Logout</option>
            </select>
        </div>
    )
}

export default Dropdown
