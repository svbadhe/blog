import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./Component.css";

function AddTile() {
    
    const [loginRegisterError, setloginRegisterError] = useState("");
    const history = useHistory();
    function handleSubmit(event){
        event.preventDefault();
        let title = event.target.title.value;
        let content = event.target.content.value;
        let author = window.localStorage.getItem('name');
        if (author===null || author===null || author===undefined){
            setloginRegisterError("Please Login or Register to Post Articles!");
        } else {
            if (title==="" || content===""){
                setloginRegisterError("Please enter title and content!");
           } else {
            fetch("http://localhost:3001/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: `title=${title}&content=${content}&author=${author}`,
              })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                if(data.code==="success"){
                    history.push("/");
                } else {
                    setloginRegisterError("Something went wrong, please try again after some time!")
                }
            });
           }
        }
    }

    return (
        <>
        <div className="add-tile">
            <form onSubmit={handleSubmit}>
                <input name="title" className="title" type="text" placeholder="Title"/>
                <hr />
                <textarea name="content" className="content" placeholder="Content" />
                <button className="submitButton" type="submit">+</button>
            </form>
        </div>
        <p style={{color:"red"}}>{loginRegisterError}</p>
        </>
    )
}

export default AddTile
