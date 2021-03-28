import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import { useHistory } from "react-router-dom";

export default function ClinicContainer(props) {
	const [rows, setRows] = useState([]);	
	const [loading, setLoadingStatus] = useState(true);

	let history = useHistory();
	let content;
	useEffect(() => {
		async function fetchData() {
			await Axios.get(`/api/getClinics`).then( function(response) {
				setRows(response.data.rows);
				setLoadingStatus(false);	
			});
		}
		
		//check if logged in -- if we are we can load the data now
		Axios.get("/isLoggedIn").then( function(response) {
			if (!response.data)
				history.push("/login")

			else
				fetchData();
		})
	}, []);

	////////////////////////////////////////////////////////////////////
	// Temporary: maps to results pages
	///////////////////////////////////////////////////////////////////
	function handleClick(param) {
    	history.push(`/edit/${param}`);
	}


	///////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////

	//if we're still loading the results, then display a spinner
	if (loading) {
	    content = <Loader className="loader" type="ThreeDots" color="#00BFF" height={100} width={100} />
	}

    //if we found no results display some error message
    else if (!loading && rows.length === 0) {
	    content = <div className="error"><h2>There's an error retrieving data.</h2></div>
	}

	//if the data has loaded now we can map the rows 
	else {
		content = 
			<ul>
				{rows.map(data => 
					<li key={data.clinic}>
						<button type="button" 
								onClick={()=>handleClick(data.clinic)}>
									 {data.clinic} 
						</button>
					</li>)}
			</ul>	
	}	

	//do more here later to make it pretty
	return (
		<div>
			{content}	
		</div>
	);
	/////////////////////////////////////////////////////////////////////////
}


// lists clinics on page 
//<h1>{rows.map(data => <div>{data.clinic}</div>)}</h1>  
