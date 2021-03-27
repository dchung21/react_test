import React, { useState } from "react";
import Axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import styles from './AddForm.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import CheckboxFormComponent from './CheckboxFormComponent.js';
import TextFormComponent from './TextFormComponent.js';
import DateFormComponent from './DateFormComponent.js';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        marginLeft: 20,
        marginTop: 20,
    }
}))

//OPTIMIZE ME PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default function ClinicForm(props) {
	const [clinicName, setClinicName] = useState(props.data.clinicName);
	const [address, setAddress] = useState(props.data.address);
	const [city, setCity] = useState(props.data.city);
	const [state, setState] = useState(props.data.state);
	const [zip, setZip] = useState(props.data.zip);
	const [phone, setPhone] = useState(props.data.phone);
	const [services, setServices] = useState(props.data.services);
	const [payment, setPayment] = useState(props.data.payment);
	const [lang, setLang] = useState(props.data.lang);
    const [website, setWebsite] = useState(props.data.website);
    const [openHours, setOpenHours] = useState(props.data.openHours);
    const [closeHours, setCloseHours] = useState(props.data.closeHours);

    let history = useHistory();


    

    //handles submission into endpoint
	const handleSubmit = (e) => {
		e.preventDefault();

        //converting the date type into sql time type
        let convertedOpenHours = openHours.map((data) => (
            data.toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
        ));

        let convertedCloseHours = closeHours.map((data) => (
            data.toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
        ));

        //we package the data into an object
		let data = {
			clinicName: clinicName,
			address: address,
			city: city,
			state: state,
			zip: zip,
			phone: phone,
			services: services,
			payment: payment,
			lang: lang,
            openHours: convertedOpenHours,
            closeHours: convertedCloseHours
		};

        //should have a success indicator, then we redirect to the edit page instead. 
		Axios.post(props.endpoint, data).then( (res) => {
            console.log(res);
            if (res.status == 200) {
                history.push("/manage");
            }
		});
	}


    let filters = {
        Services: 
        ["Mental Health", "Primary Care", "Immunizations", "Gastroenterology", "Dental",
        "Vision", "Women's Health", "Referrals", "Insurance E.A", "Pharmacy", "Pediatrics", 
        "Hypertension Care"]
        ,

        "Insurance & Payment":
        ["Private", "Flat Fee", "HealthyKids LA"]
        ,

        Languages:
        ["Vietnamese", "Korean", "Tagalog", "Spanish", "Russian", "Arabic"]
    }


	
    const classes = useStyles();
    
    return (
        <div className = {styles.root}>
        <h1>Add a Clinic</h1>
        <form className = {classes.root} onSubmit = {handleSubmit}>
			<FormControl>
                <TextFormComponent
                    clinicName={clinicName}
                    setClinicName={setClinicName}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    state={state}
                    setState={setState}
                    zip={zip}
                    setZip={setZip}
                    phone={phone}
                    setPhone={setPhone}
                    website={website}
                    setWebsite={setWebsite}
                />
                

                <DateFormComponent openHours={openHours} closeHours={closeHours} setOpenHours={setOpenHours} setCloseHours={setCloseHours}/>

                <div className={styles.formContent}>

               <CheckboxFormComponent title={"Services"}
                                        checked={services}
                                        checkChange={setServices}
                                        filter={filters["Services"]} />

                <CheckboxFormComponent title={"Payment Options"}
                                        checked={payment}
                                        checkChange={setPayment}
                                        filter={filters["Insurance & Payment"]} />

                <CheckboxFormComponent title={"Languages"}
                                        checked={lang}
                                        checkChange={setLang}
                                        filter={filters["Languages"]} />

                </div>
			    <Button type="submit" value="Submit" variant="contained" color="secondary">Submit</Button>
			    </FormControl>

            </form>
        </div>
    );
}