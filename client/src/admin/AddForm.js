import React from 'react';
import ClinicForm from './ClinicForm.js';
import styles from './ClinicForm.module.css';
import ControlBar from './ControlBar.js';

export default function AddForm() {
    let data = {
        clinicName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        services: [],
        payment: [],
        lang: [],
        openHours: [],
        closeHours: []
    };


    return(
        <div>
        <ControlBar />
        <div className={styles.root}>	
        <h1 style={{fontFamily: "Helvetica", textAlign: "center"}}>Add a new clinic</h1>
        <ClinicForm data={data} endpoint={"./test"} />
        </div>
        </div>
    )
}