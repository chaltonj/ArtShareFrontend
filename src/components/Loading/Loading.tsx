import { CircularProgress, Grid } from "@material-ui/core";
import * as React from 'react';

import "./Loading.css";

export default class Introduction extends React.Component {
    public render() {
        return (
            <Grid className="loading__container" container justify="center" alignContent="center">
                <CircularProgress size={ 80 }/>
            </Grid>
        );
    }
}