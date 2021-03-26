import React, { useState, useEffect } from "react";
import Axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import styles from './AddForm.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, FormLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

    useEffect(() => {
        if (openHours.length == 0 && closeHours == 0) {
            let newOpenHours = [];
            let newCloseHours = [];

            for (let i = 0; i < 7; i++) {
                newOpenHours.push(new Date('2014-08-18T00:00:00'));
                newCloseHours.push(new Date('2014-08-18T00:00:00'));
            }
            setOpenHours(newOpenHours);
            setCloseHours(newCloseHours);
        }
    }, []);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

        //should have a success indicator
		Axios.post(props.endpoint, data).then( () => {
			console.log("h1");
		});
	}


    /*
    a generic function to add/remove checked features
    params
        e: event
        arr: the array we will update -- should be services/lang/payment
        f: the corresponding function to update the state, setServices, setLang...
    */
	const genericChange = (e, arr, f) => {
		let clone = [...arr];

		if (e.target.checked) {
			clone.push(e.target.value)
		}

		else {
			let i = clone.indexOf(e.target.value);
			clone.splice(i, 1);	
		}

		f(clone);
	}

    /*
    The function to update the dates
    params:
        date: a type date var
        arr: the corresponding array -- should be openHours, closeHours
        f: the corresponding function to update the state, setOpenHours, setCloseHours...
    */
    const dateChange = (date, arr, k, f) => {
        let copy = [...arr];
        copy[k] = date;

        f(copy);
    }

    //feel like there should be a better way to store this information
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

    //we construct all the form components here
    let listServices = filters["Services"].map((data, k) => (
	    <FormControlLabel index={data + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data} 
						  onChange = {e => genericChange(e, services, setServices)}
                          checked={services.includes(data)}
                          />} 
						  label={data} 
                          onChange = {props.onChange}
            />
    ))

	let listPayment = filters["Insurance & Payment"].map((data, k) => (
	    <FormControlLabel index={data + k} 
                          control={<Checkbox id = {data.name} 
                          value={data} 
						  onChange = {e => genericChange(e, payment, setPayment)}
                          checked={payment.includes(data)}
                          />} 
						  label={data} 
                          onChange = {props.onChange}
            />
    ))

	let listLang = filters["Languages"].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data} 
						  onChange = {e => genericChange(e, lang, setLang)}
                          checked={lang.includes(data)}
                          />} 
						  label={data} 
                          onChange = {props.onChange}
            />
    ))

    let hourSelectors = [];

    for (let i = 0; i < 7; i++) {
        hourSelectors.push(
            <div>
               <KeyboardTimePicker
                index = {"open" + i}
                margin="normal"
                id="time-picker"
                label={days[i] + " Open"}
                value = {openHours[i]}
                onChange = {date => dateChange(date, openHours, i, setOpenHours)}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
            /> 

                <KeyboardTimePicker
                    index = {"close" + i}
                    margin="normal"
                    id="time-picker"
                    label={days[i] + " Close"}
                    value = {closeHours[i]}
                    onChange = {date => dateChange(date, closeHours, i, setCloseHours)}
                    KeyboardButtonProps={{
                    'aria-label': 'change time',
                     }}
                    />  
            </div>
        )
    }

	
        const classes = useStyles();
    
    
    return (
        <div className = {styles.root}>
        <h1>Add a Clinic</h1>
        <form className = {classes.root} onSubmit = {handleSubmit}>
			<FormControl>
                <div className={styles.formContent}>
                    <FormLabel>Information</FormLabel>
                    <FormGroup row>
                    <TextField id="clinicName" label="Name of Clinic" value={clinicName} placeholder = "Name of the Clinic" variant="outlined" onInput = {e => setClinicName(e.target.value)} />
                    <TextField id="address" label="Address" value={address} variant="outlined" placeholder = "Address (123 Name of Street)" onInput = {e => setAddress(e.target.value)} />
                    <TextField id="city" label="City" value={city} variant="outlined" placeholder = "Los Angeles" onInput = {e => setCity(e.target.value)} />
                    </FormGroup>
                    <FormGroup row>
                    <TextField id="state" label="State" value={state} variant="outlined" placeholder = "CA" onInput = {e => setState(e.target.value) }/>
                    <TextField id="zipcode" label="Zipcode" value={zip} variant="outlined" placeholder = "12345" onInput = {e => setZip(e.target.value)} />
			        <TextField id="phone" label="Phone" value={phone} variant="outlined" placeholder = "415-123-4567" onInput = {e => setPhone(e.target.value)} />
                    </FormGroup>
                    <TextField style = {{width: 632}} id="website" label="Website" value={website} variant="outlined" placeholder = "https://google.com" onInput = {e => setWebsite(e.target.value)} />
                </div>
                
                <div className={styles.formContent}>

                <FormLabel>Hours</FormLabel>
                <FormGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {hourSelectors}
                </MuiPickersUtilsProvider>
                </FormGroup>
                </div>

                <div className={styles.formContent}>
                <div>
                    <FormControl>
			            <FormLabel>Services</FormLabel>
                            <FormGroup>
                            {listServices}
                            </FormGroup>
                    </FormControl>
               </div> 

                <div>
			        <FormLabel>Payment Options</FormLabel>
                    <FormGroup>
			        {listPayment}
                    </FormGroup>
                </div>

                <div>
			        <FormLabel>Languages</FormLabel>
                    <FormGroup>
			        {listLang}
                    </FormGroup>
                </div>

                </div>
			    <Button type="submit" value="Submit" variant="contained" color="secondary">Submit</Button>
			    </FormControl>

            </form>
        </div>
    );
}
