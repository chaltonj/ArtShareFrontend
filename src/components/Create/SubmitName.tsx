import {
    Button,
    Grid,
    TextField,
    Typography
    }
    from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import MixpanelClient from "../../data/MixpanelClient";

interface ISubmitNameState {
    name: string
}

export default class SubmitName extends React.Component<any, ISubmitNameState> {

    constructor(props: any) {
        super(props);
        this.state = { name: "" };
    }

    private onChangeName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({name: event.target.value});
    };

    private submitName = () => {
        axios.post("http://127.0.0.1:5000/curator", { name: this.state.name }, { withCredentials: true })
            .then(res => {
                console.log(res);
                console.log(res.data);
                MixpanelClient.getInstance().peopleSet({$created: new Date(), $first_name: res.data.name})
                MixpanelClient.getInstance().alias(res.data.name);
            });
    };

    public render() {
        return (
            <React.Fragment>
                <Grid className="submitname__containergrid" container={ true } spacing={2} direction="column" justify="center" alignItems="center">
                    <Grid item={ true } key={ 1 } xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            What do we call you?
                        </Typography>
                    </Grid>
                    <Grid item={ true } key={ 1 } xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            value={ this.state.name }
                            onChange={ this.onChangeName }
                            fullWidth
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item={ true } key={ 1 } xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ this.submitName }
                            className={ "name__button" }>
                            Submit
                        </ Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}