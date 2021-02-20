import React, { useState } from "react";
import Axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";

export default function AddForm(props) {

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

    let services = filters["Services"].map((data, k) => (
	    <FormControlLabel index={data.name + k} 
                          control={<Checkbox id = {props.filterName} 
                          value={data.label} 
                          />} 
						  label={data.label} 
                          onChange = {props.onChange}
            />
    ))
    return (
        <form>
            <Input id="clinicName" placeholder = "Name of the Clinic"/>
            <Input id="address" placeholder = "Address (123 Name of Street)"/>
            <Input id="city" placeholder = "Los Angeles"/>
            <Input id="state" placeholder = "CA"/>
            <Input id="zipcode" placeholder = "12345"/>
            {services}

        </form>
    );
}
