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
	{label: "Mental Health", name: "Mental Health"},
	{label: "Primary Care", name: "Primary Care"},
	{label: "Immunizations", name: "Immunizations"},
	{label: "Gastroenterology", name: "Gastroenterology"},
	{label: "Dental", name: "Dental"},
	{label: "Vision", name: "Vision"},
	{label: "Women’s Health", name: "Women’s Health"},
	{label: "Referrals", name: "Referrals"},
	{label: "Insurance E.A", name: "Insurance E.A"},
	{label: "Pharmacy", name: "Pharmacy"},
	{label: "Pediatrics", name: "Pediatrics"},
	{label: "Hypertension Care", name: "Hypertension Care"},

],

	"Payment": [
	{label: "Private", name: "Private"},
	{label: "Flat Fee", name: "Flat Fee"},
	{label: "HealthyKids LA", name: "HealthyKids LA"},
],

	"Language": [
	{ label: "Vietnamese", name: "Vietnamese" },
	{ label: "Korean", name: "Korean" },
	{ label: "Tagalog", name: "Tagalog" },
	{ label: "Spanish", name: "Spanish" },
	{ label: "Russian", name: "Russian" },
	{ label: "Arabic", name: "Arabic" }
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

