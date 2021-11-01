import {useState, useEffect} from "react";
import Loader from "./Loader";
import Tile from "./Tile";

function Tiles(props){
    const [tiles, setTiles] = useState([""]);
    const [loader, setloader] = useState(true);
    function update(data){
        setTiles(data);
        setloader(false);
    }
    
    const url = (props.type === "personal" ? ('http://localhost:3001/myposts/' + window.localStorage.getItem("name")): 'http://localhost:3001/') ;
    
    useEffect(() => {
        fetch(url, {
        method:"GET"
    })
    .then(response => response.json())
    .then(data => {update(data);});
    }, [url]);
    
    return(loader?<Loader/>:tiles.map((tile)=><Tile key={tile._id} tile={tile} type={props.type}/>));

}

export default Tiles;