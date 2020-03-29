import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
    } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { ArtCard } from '../../components';
import { config, IArtItem } from '../../data/models';
import './Exhibition.css';

const actionTitle = "Add a piece to the collection!";
const actionSubtext = "I will print out any of the art you add onto poster paper and you can take it home after the party."

interface IExhibitionState {
    artItems: IArtItem[]
}

export default class Exhibition extends React.Component<any, IExhibitionState> {

    constructor(props: any) {
        super(props);
        this.state = { artItems: [] }
    }

    public componentDidMount = () => {
        axios.get("artdisplays",
        {
            baseURL: config.baseUrl
        }).then(res => {
            console.log(res);
            console.log(res.data);
            if (!("error" in res.data)) {
                console.log(res.data as IArtItem[]);
                this.setState({ artItems: res.data });
            }
        });
    }

    public render() {
        return (
            <Container maxWidth="md">
                <Grid container={ true } spacing={ 10 }>
                    {this.state.artItems.map((item) => (
                    <Grid item={ true } key={ item.id } xs={12} sm={6}>
                        <ArtCard 
                            imgUrl={ item.art_url }
                            artName={ item.art_name }
                            artistName={ item.artist_name }
                            curatorName={ item.curator_name }
                            curatorNotes={ item.curator_notes } />
                    </Grid>
                    ))}
                    <Grid item={ true } key={ "add piece" } xs={12} sm={6}>
                        <Card className={ "exhbition__card" }>
                            <CardActionArea className="exhibition_cardactionarea" href="/create">
                            <CardMedia
                                className={ "exhbition__cardmedia exhibition_plusbutton"}
                                image={ "plus-512.png" }
                                title={ "add art" }
                            />
                            <CardContent>
                                <Typography gutterBottom={ true } variant="h5" component="h2" color="textPrimary">
                                { actionTitle }
                                </Typography>
                                <Typography color="textSecondary">
                                { actionSubtext }
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}