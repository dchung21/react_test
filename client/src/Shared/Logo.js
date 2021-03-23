import React from 'react';
import { useHistory } from 'react-router-dom';
export default function Logo (props) {
	let history = useHistory();

	const redirectHome = (e) => {
    	history.push('/');
  	}


	return (
		<h1 id={props.name} onClick={redirectHome} style={{cursor: "pointer"}}>
		ClinicLocator
		</h1>
	)
}