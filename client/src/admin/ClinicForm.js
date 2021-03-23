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
import { FormLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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
    const [openHours, setOpenHours] = useState(props.data.openHours);
    const [closeHours, setCloseHours] = useState(props.data.closeHours);

    useEffect(() => {
        let newOpenHours = [];
        let newCloseHours = [];

        for (let i = 0; i < 7; i++) {
            newOpenHours.push(new Date('2014-08-18T00:00:00'))
            newCloseHours.push(new Date('2014-08-18T00:00:00'))
        }
        setOpenHours(newOpenHours);
        setCloseHours(newCloseHours);
    }, []);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const handleSubmit = (e) => {
		e.preventDefault();

        let convertedOpenHours = openHours.map((data) => (
            data.toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
        ));

        let convertedCloseHours = closeHours.map((data) => (
            data.toISOString().slice(0, 19).replace('T', ' ').split(' ')[1]
        ));

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

		Axios.post('/test', data).then( () => {
			console.log("h1");
		});
	}


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

    const dateChange = (date, arr, k, f) => {
        let copy = [...arr];
        copy[k] = date;

        f(copy);
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

    let openHourSelector = openHours.map((data, k) => (
            <KeyboardTimePicker
            index = {"open" + k}
            margin="normal"
            id="time-picker"
            label={days[k]}
            value = {data}
            onChange = {date => dateChange(date, openHours, k, setOpenHours)}
            KeyboardButtonProps={{
            'aria-label': 'change time',
            }}
        />
    ))

    let closeHourSelector = closeHours.map((data, k) => (
            <KeyboardTimePicker
            index = {"close" + k}
            margin="normal"
            id="time-picker"
            label={days[k]}
            value = {data}
            onChange = {date => dateChange(date, closeHours, k, setCloseHours)}
            KeyboardButtonProps={{
            'aria-label': 'change time',
            }}
        />
    ))

	
        const classes = useStyles();
    
    return (
        <div>
        <h2>Add a Clinic</h2>
        <form className = {classes.root} onSubmit = {handleSubmit}>
			<FormControl>
                <div>
                    <TextField id="clinicName" label="Name of Clinic" value={clinicName} placeholder = "Name of the Clinic" variant="outlined" onInput = {e => setClinicName(e.target.value)} />
                    <TextField id="address" label="Address" value={address} variant="outlined" placeholder = "Address (123 Name of Street)" onInput = {e => setAddress(e.target.value)} />
                    <TextField id="city" label="City" value={city} variant="outlined" placeholder = "Los Angeles" onInput = {e => setCity(e.target.value)} />
                    <TextField id="state" label="State" value={state} variant="outlined" placeholder = "CA" onInput = {e => setState(e.target.value) }/>
                    <TextField id="zipcode" label="Zipcode" value={zip} variant="outlined" placeholder = "12345" onInput = {e => setZip(e.target.value)} />
			        <TextField id="phone" label="phone" value={phone} variant="outlined" placeholder = "415-123-4567" onInput = {e => setPhone(e.target.value)} />
                </div>
                
                <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <h2>Open Hours</h2>
                    {openHourSelector}
                    <h2>Close Hours</h2>
                    {closeHourSelector}
                </MuiPickersUtilsProvider>
                </div>
                <div>
			        <FormLabel>Services</FormLabel>
                    <FormGroup row>
                    {listServices}
                    </FormGroup>
                </div>
                
                <div>
			        <FormLabel>Payment Options</FormLabel>
                    <FormGroup row>
			        {listPayment}
                    </FormGroup>
                </div>

                <div>
			        <FormLabel>Languages</FormLabel>
                    <FormGroup row>
			        {listLang}
                    </FormGroup>
                </div>
			    </FormControl>

			    <Button type="submit" value="Submit" variant="contained" color="secondary">Submit</Button>
            </form>
        </div>
    );
}
