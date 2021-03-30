import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function TextFormComponent(props) {

    return(
        <Card>
            <CardContent>
            <Typography style={{paddingBottom: "10px"}}>Information</Typography>
            <FormGroup row>
                <TextField id="clinicName" label="Name of Clinic" value={props.clinicName} placeholder = "Name of the Clinic" variant="outlined" onInput = {e => props.setClinicName(e.target.value)} />
                <TextField id="address" label="Address" value={props.address} variant="outlined" placeholder = "Address (123 Name of Street)" onInput = {e => props.setAddress(e.target.value)} />
            </FormGroup>
            <FormGroup row>
                <TextField id="city" label="City" value={props.city} variant="outlined" placeholder = "Los Angeles" onInput = {e => props.setCity(e.target.value)} />
                <TextField id="state" label="State" value={props.state} variant="outlined" placeholder = "CA" onInput = {e => props.setState(e.target.value) }/>
            </FormGroup>
            <FormGroup row>
                <TextField id="zipcode" label="Zipcode" value={props.zip} variant="outlined" placeholder = "12345" onInput = {e => props.setZip(e.target.value)} />
        		<TextField id="phone" label="Phone" value={props.phone} variant="outlined" placeholder = "415-123-4567" onInput = {e => props.setPhone(e.target.value)} />
            </FormGroup>
            <TextField id="website" label="Website" value={props.website} variant="outlined" placeholder = "https://google.com" onInput = {e => props.setWebsite(e.target.value)} />
            </CardContent>
        </Card>
    )
}
