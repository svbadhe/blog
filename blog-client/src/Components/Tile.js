import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Component.css"

function Tile(props) {
    const history = useHistory();
    function onDelete(){
        const url = "http://localhost:3001/" + props.tile._id;
        fetch(url, {
            method:"DELETE"
        })
        .then(response => response.json())
        .then(data => history.go(0));
    }

    return (
        <>
        <Link className="blog-title" to={"/"+props.tile._id}>
            <div className="tile">
                <p className="tileTitle">{props.tile.title}</p>
                <p className="tileDateTime">{props.tile.author} • {props.tile.date} • {props.tile.time}</p>            
            </div>
        </Link>
        {props.type==="personal"?<button onClick={onDelete}>delete</button>:null}
        </>
    )
}

export default Tile
