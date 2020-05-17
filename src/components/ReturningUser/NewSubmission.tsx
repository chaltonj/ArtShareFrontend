import { Typography }from '@material-ui/core';
import * as React from 'react';

import "./ReturningUser.css";

export default class NewSubmission extends React.Component {
    public render() {
        return (
            <Typography variant="h4" align="center" color="textPrimary">
            New Submission
            </Typography>
        );
    }
}