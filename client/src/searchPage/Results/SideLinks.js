import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import LaunchIcon from '@material-ui/icons/Launch';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
	maxWidth: 360,
	backgroundColor: theme.palette.background.paper,
	position: '-webkit-sticky',
	position: 'sticky',
	paddingLeft: 20,
	paddingTop: 20,
	top: 30,
	},

  ls: {
    border: "1px solid #cccccc",
    borderRadius: 3,
    minWidth: 320,
}
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.ls} component="nav" aria-label="main mailbox folders">
		  <ListItemLink target = "_blank" href={props.website}>
          		<ListItemIcon>
					<LaunchIcon />
          		</ListItemIcon>
				<ListItemText primary="Visit Website"/>
        	</ListItemLink>
		<Divider variant="middle"/>

		<ListItemLink target = "_blank" href={props.directions}>
			<ListItemIcon>
				<DirectionsIcon primary = "Get Directions" />
			</ListItemIcon>
			<ListItemText primary = "Get Directions" />
		</ListItemLink>
        <Divider variant="middle"/>

		<ListItem>
       	   <ListItemIcon>
			  <PhoneInTalkIcon />
   	       </ListItemIcon>
          <ListItemText primary= {props.phone} />
        </ListItem>

      </List>
    </div>
  );
}
