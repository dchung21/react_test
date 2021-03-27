import React, { useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
export default function DateFormComponent(props) {
    useEffect(() => {
        if (props.openHours.length == 0 && props.closeHours.length == 0) {
            let newOpenHours = [];
            let newCloseHours = [];

            for (let i = 0; i < 7; i++) {
                newOpenHours.push(new Date('2014-08-18T00:00:00'));
                newCloseHours.push(new Date('2014-08-18T00:00:00'));
            }
            props.setOpenHours(newOpenHours);
            props.setCloseHours(newCloseHours); 
        }
    }, []);

    let hourSelectors = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    /*
    The function to update the dates
    params:
        date: a type date var
        arr: the corresponding array -- should be openHours, closeHours
        f: the corresponding function to update the state, setOpenHours, setCloseHours...
    */
    const dateChange = (date, arr, k, f) => {
        let copy = [...arr];
        copy[k] = date;
        f(copy);
    }

    for (let i = 0; i < 7; i++) {
        hourSelectors.push(
            <div>
               <KeyboardTimePicker
                index = {"open" + i}
                margin="normal"
                id="time-picker"
                label={days[i] + " Open"}
                value = {props.openHours[i]}
                onChange = {date => dateChange(date, props.openHours, i, props.setOpenHours)}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
            />

                <KeyboardTimePicker
                    index = {"close" + i}
                    margin="normal"
                    id="time-picker"
                    label={days[i] + " Close"}
                    value = {props.closeHours[i]}
                    onChange = {date => dateChange(date, props.closeHours, i, props.setCloseHours)}
                    KeyboardButtonProps={{
                    'aria-label': 'change time',
                     }}
                    />
            </div>
        );
    }

    return(
        <div>
            <FormLabel>Hours</FormLabel>
            <FormGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {hourSelectors}
                </MuiPickersUtilsProvider>
            </FormGroup>
        </div>
    );
}
