import {
    Card,
    CardContent,
    CardMedia,
    Typography
    }
    from '@material-ui/core';
import * as React from 'react';

import "../Exhibition/Exhibition.css";

interface IShowArtDetailsProps {
    imgUrl: string
    artName: string,
    artistName: string
}

export default class ShowArtDetails extends React.Component<IShowArtDetailsProps> {

    public render() {
        return (
            <React.Fragment>
                <Card className={ "exhbition__card" }>
                    <CardMedia
                        className={ "exhbition__cardmedia"}
                        image={ this.props.imgUrl }
                        title={ this.props.artName }
                    />
                    <CardContent>
                        <Typography gutterBottom={ true } variant="h5" component="h2" color="textPrimary">
                        { this.props.artName }
                        </Typography>
                        <Typography color="textSecondary" paragraph={ true }>
                        { this.props.artistName }
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}