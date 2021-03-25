import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Logo from '../Shared/Logo.js';
import styles from './login.module.css';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export default function Login() {
    let history = useHistory();


    const useStyles = makeStyles({
		root: {
			fontFamily: "Helvetica",
            paddingRight: 0,
            alignItems: 'center',
            
		}
    })  
    
    
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


	const classes = useStyles();

     let content;
    if (loading) {
        content = <Loader className="loader" 
                            type="ThreeDots" 
                            color="#00BFF" 
                            height={100} 
                            width={100} 
                            style = {{
                                position: "fixed",
                                top: '50%',
                                left: '58%',
                            }}
                            />
    }
    return(  
        <div className={styles.container}>
            {content}
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