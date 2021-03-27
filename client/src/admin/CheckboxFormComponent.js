import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';

export default function CheckboxFormComponent(props) {

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
        <div>
            <FormControl>
                <FormLabel>{props.title}</FormLabel>
                <FormGroup>
                {checkboxes}
                </FormGroup>
            </FormControl>
        </div>
    )
}
