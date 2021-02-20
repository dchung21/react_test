import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

export default function Login() {
    let history = useHistory();

    const [failedLogin, setLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value, e.target[1].value);

        let data = {
            "username": e.target[0].value,
            "password": e.target[1].value
        }

        Axios.post("./login", data).then(function(response) {
            console.log(response);
            if (response.data)
                history.push("/manage");
            else
                setLogin(true);
        });
    }

    const test = (e) => {
        Axios.get("./isLoggedIn").then(function(response) {
            console.log(response);
        })
    }

    const logout = () => {
        Axios.get("./logout").then(function(response) {
            console.log("logged out")
        })
    }

    return(
        <div>
            <form onSubmit = {handleSubmit}>
            <Input id="username" placeholder = "Username"/>
            <Input id="password" placeholder = "Password"/>
            <Button type = "submit" variant = "contained" color = "primary">
                Login     
            </Button>
        </form>
        <Button onClick = {test}> Check if Logged in </Button>
        <Button onClick = {logout}> Log out</Button>

        </div>
        
    );
}