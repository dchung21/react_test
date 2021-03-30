import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function ControlBar(props) {
    const classes = useStyles();
    let history = useHistory();

    const toAddClinic = () => {
        history.push('/add');
        history.go();
    }

    const logout = () => {
        axios.get('/logout').then(() => {
            history.push('/login');
            history.go();
        });
    }

    const goHome = () => {
        history.push('/manage');
        history.go();
    }

    return(
        <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title} onClick={goHome} style={{cursor:'pointer'}}>
                    Control Panel
                </Typography>
                <Button color="inherit" onClick={toAddClinic}>
                    <AddIcon color="inherit"/>
                    Add a Clinic
                </Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </Toolbar>
        </AppBar>
    )
}