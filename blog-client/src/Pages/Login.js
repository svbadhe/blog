import React, {useState} from 'react';
import Header from "../Components/Header"
import { useHistory } from 'react-router';

function Login() {
    const [error, seterror] = useState({email:"",password:""});
    const history = useHistory();
    function submit(event){
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: `email=${email}&password=${password}`,
          })
        .then(response=>response.json())
        .then(data=>{
            if(data.code==="e1p0"){
                seterror({password:"Incorrect Password!"});
            } else if (data.code==="e0p0"){
                seterror({email:"User not found, please register first!"});
            } else if (data.code==="e1p1"){
                window.localStorage.setItem("name",data.result.name);
                window.localStorage.setItem("_id",data.result._id);
                history.replace("/");
            }
        });  
    }
    return (
        <>
        <Header />
        <div className="login">
            <form onSubmit={submit}>
                <input name="email" type="email" placeholder="email" required={true}/>
                <p>{error.email}</p>
                <input name="password" type="password" placeholder="password" required={true}/>
                <p>{error.password}</p>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login
