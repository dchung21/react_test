import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Logo from '../Shared/Logo.js';
import styles from './login.module.css';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export default function Login() {

    const useStyles = makeStyles({
		root: {
			fontFamily: "Helvetica",
            paddingRight: 0,
            alignItems: 'center',
            
		}
    })  
    
    
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
                console.log("Logged in successfully"); //prob will just redirect...
            else
                setLogin(true);
        });
    }


	const classes = useStyles();
    return(  
       
        <div className={styles.container}>
			<div className={styles.center}>
            <Logo name={styles.homeLogo} />
                <div className={styles.form}>
                    <form onSubmit = {handleSubmit}>
                        <div className={styles.header}>
                            Sign In
                        </div>
                        <div className={styles.input}>
                            <div className={styles.label}>
                                <Input id="username" placeholder = "Username"/>
                            </div>

                            <div className={styles.label}>
                                <Input id="password" placeholder = "Password" />  
                                
                            </div>
                        </div>
                        <Button type = "submit" variant = "contained" color = "primary">
                            Login     
                        </Button>     
                    </form>
                </div>
            </div>
        </div> 
          
    );
}