//This component is responsible for rendering the "See all" filter modal when pressed.

import React, { useState } from 'react';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './filterModal.module.css';

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

	"Payment": [
	{label: "Private", name: "privateInsurance"},
	{label: "Flat Fee", name: "flatFee"},
	{label: "HealthyKids LA", name: "healthtKids"},
],

	"Language": [
	{ label: "Vietnamese", name: "vietnamese" },
	{ label: "Korean", name: "korean" },
	{ label: "Tagalog", name: "tagalog" },
	{ label: "Spanish", name: "spanish" },
	{ label: "Russian", name: "russian" },
	{ label: "Arabic", name: "arabic" }
]
}


export default function FilterModal(props) {
	const [selectedFilter, setFilter] = useState([]);
	const [currentFilter, setCurrent] = useState([]);

	/* handles selecting/unselecting filters by checkboxes, appends or removes from currentFilter */
	const onChange = (event) => {
	    let tFilter = [...selectedFilter];

	    if (!tFilter.includes(event.target.value)) {
		tFilter.push(event.target.value);	
	    }

	    else {
	        let i = tFilter.indexOf(event.target.value);
		tFilter.splice(i, 1)
	    }

	    setFilter(tFilter);
	}

	const test = () => {
	    setCurrent(selectedFilter);
	    props.onSubmit(props.name, selectedFilter)
	}

	/* closes the modal */
	const close = () => {
	    setFilter(currentFilter);
	    props.onClose();
	}

	let form;
	
	if (props.name !== "") {
	    form = filters[props.name].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
			      class = {styles.checkbox} 
                          control={<Checkbox id = {props.filterName} 
                          value={data.label} 
						  onChange = {onChange} 
                          checked={selectedFilter.includes(data.label)}/>} 
						  label={data.label} 
                          onChange = {props.onChange}
            />
	    ))
	}



	return (
	    <Modal isOpen={props.isOpen}
		   noBackdrop={'no'}
		   clickBackdropToClose={false}
		   className={styles.filterModal}
		   backdropClassName={styles.container}
		   overlayClassName={styles.Overlay}
	    >

	    <div className = {styles.filterContent}>
		<h2 className={styles.title}>{props.name}</h2>
		<div className={styles.filters}>
		<div className={styles.form}>
		    <FormControl component="fieldset" fullWidth={true}>
			<FormGroup row>
			    {form}
			</FormGroup>
		    </FormControl>
		</div>

		<div className={styles.buttons}>
		    <button className={styles.btn} onClick={test}>Search</button>
		    <button className={styles.btn} onClick={close}>Close</button>
		</div>
		</div>
	    </div>
	    </Modal>
	);
}

