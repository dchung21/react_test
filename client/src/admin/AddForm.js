import React, { useState } from "react";
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

export default function AddForm(props) {
	const [clinicName, setClinicName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [phone, setPhone] = useState("");
	const [services, setServices] = useState([]);
	const [payment, setPayment] = useState([]);
	const [lang, setLang] = useState([]);


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(services);

		let data = {
			clinicName: clinicName,
			address: address,
			city: city,
			state: state,
			zip: zip,
			phone: phone,
			services: services,
			payment: payment,
			lang: lang
		};
		console.log(data);
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



let filters = {
	Services: [
	{label: "Mental Health", name: "cancer"},
	{label: "Primary Care", name: "flu"},
	{label: "Immunizations", name: "cold"},
	{label: "Gastroenterology", name: "h1n1"},
	{label: "Dental", name: "dental"},
	{label: "Vision", name: "vision"},
	{label: "Women’s Health", name: "derm"},
	{label: "Referrals", name: "general"},
	{label: "Insurance E.A", name: "general"},
	{label: "Pharmacy", name: "general"},
	{label: "Pediatrics", name: "general"},
	{label: "Pediatrics", name: "general"},
	{label: "Hypertension Care", name: "general"},

],

	"Insurance & Payment": [
	{label: "Private", name: "privateInsurance"},
	{label: "Flat Fee", name: "flatFee"},
	{label: "HealthyKids LA", name: "healthtKids"},
],

	Languages: [
	{ label: "Vietnamese", name: "vietnamese" },
	{ label: "Korean", name: "korean" },
	{ label: "Tagalog", name: "tagalog" },
	{ label: "Spanish", name: "spanish" },
	{ label: "Russian", name: "russian" },
	{ label: "Arabic", name: "arabic" }
]
}

    let listServices = filters["Services"].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data.label} 
						  onChange = {e => genericChange(e, services, setServices)}
                          />} 
						  label={data.label} 
                          onChange = {props.onChange}
            />
    ))

	let listPayment = filters["Insurance & Payment"].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data.label} 
						  onChange = {e => genericChange(e, payment, setPayment)}
                          />} 
						  label={data.label} 
                          onChange = {props.onChange}
            />
    ))

	let listLang = filters["Languages"].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data.label} 
						  onChange = {e => genericChange(e, lang, setLang)}
                          />} 
						  label={data.label} 
                          onChange = {props.onChange}
            />
    ))

	
        const classes = useStyles();
    
    return (
        <div>
        <h2>Add a Clinic</h2>
        <form className = {classes.root} onSubmit = {handleSubmit}>
			<FormControl>
                <div>
                    <TextField id="clinicName" label="Name of Clinic" placeholder = "Name of the Clinic" variant="outlined" onInput = {e => setClinicName(e.target.value)} />
                    <TextField id="address" label="Address" variant="outlined" placeholder = "Address (123 Name of Street)" onInput = {e => setAddress(e.target.value)} />
                    <TextField id="city" label="City" variant="outlined" placeholder = "Los Angeles" onInput = {e => setCity(e.target.value)} />
                    <TextField id="state" label="State" variant="outlined" placeholder = "CA" onInput = {e => setState(e.target.value) }/>
                    <TextField id="zipcode" label="Zipcode" variant="outlined" placeholder = "12345" onInput = {e => setZip(e.target.value)} />
			        <TextField id="phone" label="phone" variant="outlined" placeholder = "415-123-4567" onInput = {e => setPhone(e.target.value)} />
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
