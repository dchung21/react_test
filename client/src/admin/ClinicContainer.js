import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import ControlBar from './ControlBar.js';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { CardContent, Typography } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ClinicContainer(props) {
    const [rows, setRows] = useState([]);
    const [loading, setLoadingStatus] = useState(true);
    const [deleted, setDeleted] = useState(false);

    console.log(props);

    let history = useHistory();
    let content;
    useEffect(() => {
        async function fetchData() {
            await Axios.get(`/api/getClinics`).then(function (response) {
                setRows(response.data.rows);
                setLoadingStatus(false);
            });


        }

        //check if logged in -- if we are we can load the data now
        Axios.get("/isLoggedIn").then(function (response) {
            if (!response.data)
                history.push("/login")

            else
                fetchData();
        })

        if (props.history.location.state)
            setDeleted(props.history.location.state.deleted);

    }, []);

    function handleClick(param) {
        history.push(`/edit/${param}`);
    }


    // BEGIN LOADING DATA
    //if we're still loading the results, then display a spinner
    if (loading) {
        content = <Loader className="loader" type="ThreeDots" color="#00BFF" height={100} width={100} />
    }

    //if we found no results display some error message
    else if (!loading && rows.length === 0) {
        content = <div className="error"><h2>There's an error retrieving data.</h2></div>
    }

    //if the data has loaded now we can map the rows 
    else {
        content =
            <ul>
                {rows.map(data =>
                    <div style={{ paddingBottom: 10, width: "40%", cursor: "pointer" }}>
                        <Card onClick={() => handleClick(data.clinic)}>
                            <CardContent>
                                <Typography>{data.clinic}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </ul>
    }

    //FINISH LOADING DATA 

    //do more here later to make it pretty

    const handleDeleteClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDeleted(false);
    };

    return (

        <div>
            <Snackbar open={deleted}
                autoHideDuration={6000}
                onClose={handleDeleteClose}
            >
                <Alert onClose={handleDeleteClose} severity="success">
                    Successfully deleted clinic!
                </Alert>
            </Snackbar>
            <ControlBar />
            {content}
        </div>
    );
    /////////////////////////////////////////////////////////////////////////
}


// lists clinics on page 
//<h1>{rows.map(data => <div>{data.clinic}</div>)}</h1>  
