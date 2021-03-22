import React, { useEffect, useState }  from 'react';
import SearchInput from '../../Shared/SearchInput.js';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import SimpleList from './SideLinks.js';
import CheckText from './PaymentCheck.js';
import Logo from '../../Shared/Logo.js';
import styles from './resultPage.module.css';
import Axios from 'axios';
import EmptyResultPage from './EmptyResultPage';
import Loader from 'react-loader-spinner';


function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
	time[3] = " ";
  return time.join (''); // return adjusted time or original string
}

function isOpen(open, close) {
	if (open == close)
		return false;
	let o = open.split(':'); // split it at the colons
	let c = close.split(':');
	// minutes are worth 60 seconds. Hours are worth 60 minutes.
	let o_seconds = (+o[0]) * 60 * 60 + (+o[1]) * 60 + (+o[2]); 
	let c_seconds = (+c[0]) * 60 * 60 + (+c[1]) * 60 + (+c[2]);
	
	let seconds = new Date().getTime() / 1000;
	return seconds >= o_seconds && c_seconds >= seconds;
}


function mapTileProvider (x, y, z, dpr) {
  return `https://api.maptiler.com/maps/streets/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=0qXe9fatH9TgwZzcuFgC`;
}

function convertHours(hours) {
	let hr = [];
	for (let i = 0; i < 7; i++) {
		if (hours[i].hour_open == hours[i].hour_close) {
			hr[i] = "Closed";
			}
		else {
			hr[i] = tConvert(hours[i].hour_open) + " - " + tConvert(hours[i].hour_close);
		}
	} 	
	return hr;
}

function generateDirectionLink(address) {
	return `https://www.google.com/maps/search/?api=1&query=${address.replace(" ", "+")}`;
}

function createChecks(data, type) {
	let checks = [];
	for (let i = 0; i < data.length; i++)
		checks.push(<CheckText name={styles.genericCheck} 
					text={data[i][type]}
					textName={styles.genericCheckText} />);	
	return checks;
}


export default function ResultPage (props) {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const result = await Axios.get(`../api/getClinicData/${props.match.params.clinic}`).then( function(response) {
			setData(response.data);
			setIsLoading(false);
			});
		}
		fetchData();
	}, []);


	if (isLoading) {
		return (
			<div className = {styles.resultContainer}>
				<div className = {styles.header}>
					<Logo name={styles.searchLogo} />
					<SearchInput />
				</div>
				<div className = {styles.loaderBody}>
					<Loader className={styles.loader} type="ThreeDots" color="#00Bff" height={100} width={100} />
				</div>
			</div>
			)
	}
	let d = new Date();
	let n = d.getDay();

	if (!(Object.keys(data).length === 0 && data.constructor === Object) && data["rows"].length > 0) {
		let hours = convertHours(data.rows);
		console.log(data);
		const map = (
			<Map provider={mapTileProvider} center={[data.rows[0].longitude, data.rows[0].latitude]} zoom={16} dprs={[1, 2]} mouseEvents={false} touchEvents={false} width={250} height = {150}>
				<Marker anchor={[data.rows[0].longitude, data.rows[0].latitude]} />
			</Map>
		);

		return (
			<div className = {styles.resultContainer}>
				<div className = {styles.header}>
					<Logo name={styles.searchLogo}/>
					<SearchInput />	
				</div>
			
				<div className = {styles.body}>
					<div className = {styles.content}>

					<div className = {styles.bodyHeader}>
						<h1>{props.match.params.clinic}</h1>
						<h3 className = {styles.currentHour}>{((hours[n] != "Closed") ? "Open" : "") + " " + hours[n]}</h3>
					</div>

					<div className = {styles.about}>
						<h2> About </h2>
						<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id sapien iaculis, ornare nisi id, malesuada sapien. Curabitur luctus tincidunt augue, sit amet tincidunt nibh ornare a. Mauris bibendum rhoncus dui non sodales. Integer sit amet magna nec arcu egestas fringilla. Nunc sit amet sem eget tortor hendrerit egestas. Phasellus et dignissim turpis. Maecenas ac porta dui, ac semper ante. Phasellus in augue felis. </p>
					</div>

					<div className = {styles.locationHours}>
						<h2> Location and Hours </h2>
						<div className = {styles.map}>
							{map}
							<h5 className = {styles.address}>{data.rows[0].address}<br />  {data.rows[0].city + ", " + data.rows[0].state + " " + data.rows[0].zipcode} </h5>	
						</div>

						<div className = {styles.hours}>
							<b className={styles.day1}>Mon</b><div className="hour1">{hours[0]}</div>
							<b className={styles.day2}>Tue</b><div className="hour2">{hours[1]}</div>
							<b className={styles.day3}>Wed</b><div className="hour3">{hours[2]}</div>
							<b className={styles.day4}>Thu</b><div className="hour4">{hours[3]}</div>
							<b className={styles.day5}>Fri</b><div className="hour5">{hours[4]}</div>
							<b className={styles.day6}>Sat</b><div className="hour6">{hours[5]}</div>
							<b className={styles.day7}>Sun</b><div className="hour7">{hours[6]}</div>
						</div>
					
					</div>

						<div className = {styles.ameneties}>
							<div className = {styles.language}>
							<h4>Language</h4>
							{createChecks(data.language, "language")}<br />
							</div>
							<div className = {styles.insurance}>
							<h4>Insurance</h4>
							{createChecks(data.payment, "payment")}<br />
							</div>
							<div className = {styles.treatment}>
							<h4>Treatments</h4>
							{createChecks(data.services, "services")}<br />
							</div>
						</div>
					</div>

					<SimpleList directions = {generateDirectionLink(data.rows[0].address)} phone = {data.rows[0].phone} />
				</div>
			</div>
		)
}
	else {
		return (<EmptyResultPage />);
	}
}


