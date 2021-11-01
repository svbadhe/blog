import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import Header from "../Components/Header";
import "./Blog.css";

function Blog() {
    const history = useHistory();
    const [commentDivStyle, setcommentDivStyle] = useState({display:"none"});
    const [loginRegisterError, setloginRegisterError] = useState("");
    const [comments, setcomments] = useState([]);
    const blogID = useParams().blogID;
    const [data, setdata] = useState({title:"",content:"",author:"",date:"",time:""});
    useEffect(() => {
        fetch(('http://localhost:3001/'+blogID), {
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
            setdata(data.result);
            fetch(('http://localhost:3001/comments/'+blogID), {
                method:"GET"
            })
            .then(response => response.json())
            .then(data => {
                setcomments(data);
            })
        });
    }, [blogID]);

    function commentOnClick(){
        if (commentDivStyle.display === "none"){
            setcommentDivStyle({display:"block"});
        } else {
            setcommentDivStyle({display:"none"});
        }
    }


    function commentSubmit(e){
        e.preventDefault();
        let commentInput = e.target.comment.value;
        let from_id = window.localStorage.getItem('_id');
        if (from_id===null || from_id===null || from_id===undefined){
            setloginRegisterError("Please Login or Register to Post Comments!");
        } else {
            if (commentInput===""){
                setloginRegisterError("Please enter a comment!");
           } else {
            fetch("http://localhost:3001/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: `from_id=${from_id}&blog_id=${blogID}&comment=${commentInput}`,
              })
            .then(response=>response.json())
            .then(data=>{
                if(data.code === "success"){
                    history.go(0);
                } else {
                    setloginRegisterError("Something went wrong try again after sometime!");
                }
            });
           }
        }
    }

    return (
        <>
        <Header />
        <div className="tile">
            <p className="tileTitle">{data.title}</p>
            <p className="tileDateTime">{data.author} • {data.date} • {data.time}</p>
            <p className="tileContent">{data.content}</p>
            <button onClick={commentOnClick}>Add Comment</button>
            <div style = {commentDivStyle}>
                <form onSubmit={commentSubmit}>
                    <textarea name="comment" ></textarea>
                    <button type="submit">submit</button>
                </form>
                <p>{loginRegisterError}</p>
            </div>
            <h3>Comments</h3>
            {comments.length !== 0 && comments.map((com)=>{
                return (
                    <div key={com._id} className="individual-comment">
                        <h4>{com.from} {com.date} {com.time}</h4>
                        <p>{com.comment}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Blog
