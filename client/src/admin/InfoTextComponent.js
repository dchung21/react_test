import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

export const InfoTextComponent = React.memo((props) => {
    return (
        <Card>
            <CardContent>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormGroup>
                    <TextField
                        multiline
                        rows={2}
                        rowsMax={6}
                        rowsMin={6}
                        size="medium"
                        fullWidth
                        style = {{width: "90%"}}
                        defaultValue={props.note}
                        onChange= {e => props.setNote(e.target.value)}
                    />
                </FormGroup>
            </CardContent>
        </Card>
    );
});

