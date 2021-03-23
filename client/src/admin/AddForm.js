import React from 'react';
import ClinicForm from './ClinicForm.js';

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
        <ClinicForm data={data} />
    )
}