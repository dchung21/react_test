import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Logo from '../Shared/Logo.js';
import styles from './login.module.css';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Login() {
    let history = useHistory();

    const [failedLogin, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();


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

            setLoading(false);
        });
    }



     let content = "Login";
    if (loading) {
        content = <CircularProgress size={20} color={"white"}/>
    }

    let msg;
    if (failedLogin) {
        msg = <text style={{fontFamily: "Helvetica"}}>Incorrect username or password!</text>
    }
    return(  
        <div className={styles.container}>
			<div className={styles.center}>
            <Logo name={styles.homeLogo} />
                <div className={styles.form}>
                    <form onSubmit = {handleSubmit}>
                        <div className={styles.header}>
                            Sign In
                        </div>
                        {msg}
                        <div className={styles.input}>
                            <div className={styles.label}>
                                <Input id="username" placeholder = "Username"/>
                            </div>
                            <div className={styles.label}>
                                <TextField
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    />
                                
                            </div>
                        </div>
                        <Button type = "submit" variant = "contained" color = "primary">
                            {content}     
                        </Button>     
                    </form>
                </div>
            </div>
        </div> 
          
    );
}