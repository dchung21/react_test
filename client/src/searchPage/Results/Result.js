import React from 'react';
import ResultAvatar from './ResultAvatar.js';
import Paper from '@material-ui/core/Paper';
import './Result.css';
import { useHistory } from 'react-router-dom';


export default function Result(props) {
	let history = useHistory();
	
	const [shadow, setShadow] = React.useState(0.3);

	const handleMouseOver = (e) => {
	    props.enableVisibility(props.index);
	    setShadow(2);
	}

	const handleMouseLeave =(e) => {
	    props.disableVisibility(props.index);
	    setShadow(0.3);
	}

	const onClick = () => {
		history.push({pathname: `/result/${props.name}`}); 
	}

	return (
	    <Paper className="result" variant="outlined" onMouseOver={handleMouseOver} 
		   onMouseOut={handleMouseLeave} onClick = {onClick} elevation={shadow}>
		    <ResultAvatar id="avatar" />
		    <p className="resultData" id="resultName">{(props.index + 1) + ". " + props.name}</p>
		    <p className="distance">{Math.round(props.distance * 100) / 100 + " mi"}</p>
	    </Paper>
	);
}
