import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export default function SearchInput(props) {
	const [address, setAddress] = React.useState("");

	const handleChangeSearch = (e) => {
		setAddress(e.target.value);
	}

  
	const handleSubmit =(e) => {
		e.preventDefault();
		let data = {
			address: address
		};
		props.handleSubmit(data);
	}
  

	const useStyles = makeStyles((theme: Theme) =>
            createStyles({
            root: {
            padding: '2px 4px',
	    display: 'flex',
            alignItems: 'center',
            width: 600,
            },

            input: {
                marginLeft: theme.spacing(1),
                flex: 1,
            },

            iconButton: {
                padding: 10,
            },

            divider: {
                height: 28,
                margin: 4,
            },
        }),
        );

        const classes = useStyles();
        return (
            <div className="searchBar">
    	    	<Paper id = "titleComponent" className={classes.root} >
                    <form className = {classes.root} onSubmit = {handleSubmit}>
      			<InputBase
       				 className={classes.input}
           	    	placeholder="Type in your address here"
        			inputProps={{ 'aria-label': 'search google maps' }}
					onChange = {handleChangeSearch}
      			/>
                        <Divider className={classes.divider} orientation="vertical" />
                        Near
                        <InputBase
       				 className={classes.input}
           	    	placeholder="Zipcode or City"
        			inputProps={{ 'aria-label': 'search google maps' }}
					onChange = {handleChangeSearch}
      			/>

      				<Divider className={classes.divider} orientation="vertical" />
      				<IconButton type = "submit" className={classes.iconButton} aria-label="search">
       		 			<SearchIcon />
      				</IconButton>
				</form>

    		</Paper>
        </div>
  );
}

