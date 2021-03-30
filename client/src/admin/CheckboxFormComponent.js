import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export const CheckboxFormComponent = React.memo((props) => {
    /*
    a generic function to add/remove checked features
    params
        e: event
        arr: the array we will update -- should be services/lang/payment
        str: the string corresponding to the filters object
        f: the corresponding function to update the state, setServices, setLang...
    */
    const genericChange = (e, arr, f) => {
        let clone = [...arr];

	if (e.target.checked) {
	    clone.push(e.target.value)
	}

	else {
	    let i = clone.indexOf(e.target.value);
	    clone.splice(i, 1);
	}

	f(clone);
    }

    let checkboxes = props.filter.map((data, k) => (
        <FormControlLabel 
            index = {data+k}
            control = {<Checkbox 
                        value={data}
                        onChange={e => genericChange(e, props.checked, props.checkChange)}
                        checked={props.checked.includes(data)}
                    />}
            label={data}
        />
    ));

    return(
        <Card>
            <CardContent>
            <FormControl>
                <FormLabel>{props.title}</FormLabel>
                <FormGroup>
                {checkboxes}
                </FormGroup>
            </FormControl>
            </CardContent>
        </Card>
    )
});


