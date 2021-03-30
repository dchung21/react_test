import React, { useCallback, useState } from "react";
import Axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import { CheckboxFormComponent } from './CheckboxFormComponent.js';
import TextFormComponent from './TextFormComponent.js';
import { DateFormComponent } from './DateFormComponent.js';
import styles from './ClinicForm.module.css';

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

let filters = {
    Services:
        ["Mental Health", "Primary Care", "Immunizations", "Gastroenterology", "Dental",
            "Vision", "Women's Health", "Referrals", "Insurance E.A", "Pharmacy", "Pediatrics",
            "Hypertension Care"]
    ,

    "Insurance & Payment":
        ["Medicare", "Medi-Cal", "My Health LA", "Private", "Flat Fee", "HealthyKids LA"]
    ,

    Languages:
        ["English", "Cantonese", "Mandarin", "Vietnamese", "Korean", "Tagalog", "Spanish", "Russian", "Arabic"]
};

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
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    let history = useHistory();

    const onChangeServices = useCallback(
        (arr) => setServices(arr),
        [setServices]
    );

    const onChangePayment = useCallback(
        (arr) => setPayment(arr),
        [setPayment]
    );

    const onChangeLang = useCallback(
        (arr) => setLang(arr),
        [setLang]
    );

    const onChangeOpenHours = useCallback(
        (arr) => setOpenHours(arr),
        [setOpenHours]
    );

    const onChangeCloseHours = useCallback(
        (arr) => setCloseHours(arr),
        [setCloseHours]
    );

    //handles submission into endpoint
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        //converting the date type into sql time type
        let convertedOpenHours = openHours.map((data) => (
            //convertHours(data).toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
            data.toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
        ));

        let convertedCloseHours = closeHours.map((data) => (
            //convertHours(data).toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
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
            website: website,
            newServices: services,
            newPayment: payment,
            newLang: lang,
            ogServices: props.data.services,
            ogPayment: props.data.payment,
            ogLang: props.data.lang,
            openHours: convertedOpenHours,
            closeHours: convertedCloseHours
        };

        //should have a success indicator, then we redirect to the edit page instead. 
        Axios.post(props.endpoint, data).then((res) => {
            setSubmitLoading(false);
            if (res.status === 200) {
                history.push("/manage");
                history.go();
            }
        });
    }

    // handles deletion
    const handleDelete = (e) => {
        e.preventDefault();

        setDeleteLoading(true);
        let data = {
            clinicName: clinicName,
        };

        //should have a success indicator, then we redirect to the edit page instead. 
        Axios.post("/delete", data).then((res) => {
            setDeleteLoading(false);
            if (res.status === 200) {
                history.push("/manage");
                history.go();
            }
        });
    }



    const classes = useStyles();

    //delete content
    let deleteContent = "Delete";
    
    if (deleteLoading) {
        deleteContent = <CircularProgress size={20}/>
    }

    let submitContent = "Submit";
    if (submitLoading) {
        submitContent = <CircularProgress size={20} />
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <FormControl>
                <div className={styles.formComponent}>
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
                </div>

                <div className={styles.formComponent}>
                    <DateFormComponent openHours={openHours}
                        closeHours={closeHours}
                        setOpenHours={onChangeOpenHours}
                        setCloseHours={onChangeCloseHours}
                        className={classes.formComponnt}
                    />
                </div>

                <div>

                    <div className={styles.formComponent}>
                        <CheckboxFormComponent title={"Services"}
                            checked={services}
                            checkChange={onChangeServices}
                            filter={filters["Services"]}
                            className={classes.formComponent}
                        />
                    </div>

                    <div className={styles.formComponent}>
                        <CheckboxFormComponent title={"Payment Options"}
                            checked={payment}
                            checkChange={onChangePayment}
                            filter={filters["Insurance & Payment"]}
                            className={classes.formComponent}
                        />
                    </div>

                    <div className={styles.formComponent}>
                        <CheckboxFormComponent title={"Languages"}
                            checked={lang}
                            checkChange={onChangeLang}
                            filter={filters["Languages"]}
                            className={classes.formComponent}
                        />
                    </div>
                </div>
                <Button type="submit" value="Submit" variant="contained" color="secondary">{submitContent}</Button>
                <Button type="button" value="Delete" variant="contained" onClick={handleDelete}>{deleteContent}</Button>
            </FormControl>
        </form>
    );
}
