import React from 'react';
import Map from 'pigeon-maps';
import CenterMarker from './centerMarker.js';
import CMimg from './marker.png';
import ClinicMarker from './pin.svg';


function mapTileProvider (x, y, z, dpr) {
  return `https://api.maptiler.com/maps/streets/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${process.env.REACT_APP_MAPTILER_KEY}`;
}


export const MapBox = React.memo((props) => {
    console.log("rendering")
        //this doesn't work....
	const handleMarkerClick = (event) => {
		/*
		console.log(props.rows[payload]);
		Axios.post('./getClinicData', props.rows[payload].clinic).then( function(response) {
			history.push({pathname: '/result',
						  state: {...response.data,
						  name: props.rows[payload].clinic,
						  lat: props.rows[payload].latitude,
						  lng: props.rows[payload].longitude}}); 
		});
		*/
		console.log("alert clicked")
	}

				
	const { rows } = props;	
	    
	const map = (
						
  		<Map provider={mapTileProvider} 
  		center={[props.center[1], props.center[0]]} 
  		zoom={12.7} dprs={[1, 2]}>
			<CenterMarker 
				anchor={[props.center[1], props.center[0]]}
				name="Your Location"
				img={CMimg}
				width={15}
				height={25}
				/>

			{rows.map((data, k) => {
			    return( 
			        <CenterMarker
				    anchor={[data.longitude, data.latitude]}
				    name={data.clinic}
				    img={ClinicMarker}
				    width={25}
				    height={40}
				    onClick = {handleMarkerClick}
				/>
				)
			})}
				
		</Map>
		)
	
        return (<div className={props.cn}>{map}</div>);
});

