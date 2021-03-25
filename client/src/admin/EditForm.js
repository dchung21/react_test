import React, { useEffect, useState }  from 'react';
import ClinicForm from './ClinicForm.js';
import Axios from 'axios';

export default function EditForm(props) {

	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			await Axios.get(`../api/getClinicData/${props.match.params.clinic}`).then( function(response) {
			setData(response.data);
			setIsLoading(false);
			});
		}
		fetchData();
	}, []);

	if (isLoading) {
		return (<h1>loading</h1>)
	}

	let fillOpenHours = [];
	let fillCloseHours = [];
	for (let i = 0; i < 7; i++) {
		fillOpenHours[i] = data.rows[i].hour_open;
		fillCloseHours[i] = data.rows[i].hour_close;
	}
	
	let info = {
		clinicName: `${props.match.params.clinic}`,
		address: data.rows[0].address,
		city: data.rows[0].city,
		state: data.rows[0].state,
		zip: data.rows[0].zipcode,
		phone: data.rows[0].phone,
		services: data.services,
		payment: data.payment,
		lang: data.language,
		openHours: fillOpenHours,
		closeHours: fillCloseHours
	};


	return(
		<ClinicForm data={info} />
	)

}