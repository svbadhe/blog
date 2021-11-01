import React, {useState} from 'react';
import { useHistory } from 'react-router';
import Header from "../Components/Header"
import "./Register.css";

function Register() {
    const [error, seterror] = useState({email:"",password:""});
    const history = useHistory();
    function submit(event){
        event.preventDefault();
        let password = event.target.password.value;
        let password1 = event.target.password1.value;
        let obj = `email=${event.target.email.value}&password=${password}&name=${event.target.name.value}`;
        if(password === password1){
            fetch("http://localhost:3001/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: obj,
              })
            .then(response=>response.json())
            .then(data=>{
                if(data.code==="fail"){
                    seterror({email:"Email Already Registered!"});
                } else {
                    window.localStorage.setItem("name",data.result.name);
                    window.localStorage.setItem("_id",data.result._id);
                    history.push("/");
                }
            });
        } else {
            seterror({password:"Passwords don't match!"});
        }
    }

    return (
        <>
        <Header/>
        <div className="register">
            <form onSubmit={submit}>
                <input name="name" type="text" placeholder="name" required={true}/>
                <input name="email" type="email" placeholder="email" required={true}/>
                <p>{error.email}</p>
                <input name="password" type="password" placeholder="password" required={true}/>
                <input name="password1" type="password" placeholder="re-enter password" required={true}/>
                <p>{error.password}</p>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
}

export default Register;
