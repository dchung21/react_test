import React, { useEffect, useState } from 'react';
import ClinicForm from './ClinicForm.js';
import Axios from 'axios';
import styles from './ClinicForm.module.css';
import ControlBar from './ControlBar.js';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditForm(props) {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [successEdit, setSuccessEdit] = useState(false);
    const [notiState, setNotiState] = useState({ open: false, vertical: 'bottom', horizontal: 'center'});
    //false unless add form redirects to edit form
    const [successAdd, setSuccessAdd] = useState(false);

    const { vertical, horizontal, open } = notiState;

    useEffect(() => {
        async function fetchData() {
            await Axios.get(`../api/getClinicData/${props.match.params.clinic}`).then(function (response) {
                setData(response.data);
                setIsLoading(false);
            });
        }
        fetchData();
        window.scrollTo(0, 0);

        if (props.history.location.state)
            setSuccessAdd(props.history.location.state.add);
    }, []);

    if (isLoading) {
        return (<h1>loading</h1>)
    }

    let fillOpenHours = [];
    let fillCloseHours = [];
    for (let i = 0; i < 7; i++) {
        let o = data.rows[i].hour_open.split(/[:]/);
        const openHoursObj = new Date('2014-08-18T00:00:00');
        let h = (parseInt(o[0]) + 17) % 24;
        openHoursObj.setHours(h);
        openHoursObj.setMinutes(o[1]);
        //dateObject.setSeconds(s[2]);
        fillOpenHours[i] = openHoursObj;

        let c = data.rows[i].hour_close.split(/[:]/);
        const closeHoursObj = new Date('2014-08-18T00:00:00');
        h = (parseInt(c[0]) + 17) % 24;
        closeHoursObj.setHours(h);
        closeHoursObj.setMinutes(c[1]);
        fillCloseHours[i] = closeHoursObj;
    }

    let fillServices = [];
    let fillPayment = [];
    let fillLanguage = [];
    for (let i = 0; i < data.services.length; i++) {
        fillServices[i] = data.services[i].services.toString();
    }
    for (let i = 0; i < data.payment.length; i++) {
        fillPayment[i] = data.payment[i].payment.toString();
    }
    for (let i = 0; i < data.language.length; i++) {
        fillLanguage[i] = data.language[i].language.toString();
    }

    let info = {
        clinicName: `${props.match.params.clinic}`,
        address: data.rows[0].address,
        city: data.rows[0].city,
        state: data.rows[0].state,
        zip: data.rows[0].zipcode,
        phone: data.rows[0].phone,
        services: fillServices,
        payment: fillPayment,
        lang: fillLanguage,
        openHours: fillOpenHours,
        closeHours: fillCloseHours
    };

    const handleEditOpen = () => {
        setSuccessEdit(true);
    };

    const handleEditClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessEdit(false);
    };

    //clean up this business later lol!
    const handleAddClose = (event, reason) => {
        if (reason == 'clickaway') {
            return;
        }

        setSuccessAdd(false);
    }

    return (
        <div>
            <ControlBar />
            <div className={styles.root}>
                <h1 style={{ fontFamily: "arial" }}>Edit Clinic</h1>
                <ClinicForm data={info} endpoint={"/edit"} success={handleEditOpen} />
            </div>

            <Snackbar open={successEdit} 
                      autoHideDuration={6000} 
                      onClose={handleEditClose}
                      anchorOrigin={{ vertical, horizontal}}>
                <Alert onClose={handleEditClose} severity="success">
                    Successfully made changes!
                </Alert>
            </Snackbar>

            <Snackbar open={successAdd} 
                      autoHideDuration={6000} 
                      onClose={handleAddClose}
                      anchorOrigin={{ vertical, horizontal}}>
                <Alert onClose={handleAddClose} severity="success">
                    Successfully added clinic!
                </Alert>
            </Snackbar>



        </div>
    )

}