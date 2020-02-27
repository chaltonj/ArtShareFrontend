import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import axios from "axios";
import * as React from 'react';
import { config, IArtItem } from '../../data/models';
import './Exhibition.css';

// import ArtDisplay from "../ArtDisplay/ArtDisplay";
// import MixpanelClient from "../../data/MixpanelClient";

// const artItems: IArtItem[] = [
//     {
//         artName: "Two Sisters (On the Terrace)",
//         artistName: "Pierre-Auguste Renoir",
//         curatorDescription: "The colors really pop.  This painting reminds me how impressionism gets the name, like the artist just looked over at the two girls for an instant, and then painted this from memory.",
//         curatorId: "1",
//         curatorName: "Chris",
//         photoUrl: "twosisters.png"
//     },
//     {
//         artName: "The Son of Man",
//         artistName: "René Magritte",
//         curatorDescription: "I like apples, I like dapper men.  This painting really has it all for me.",
//         curatorId: "1",
//         curatorName: "Chris",
//         photoUrl: "sonofman.jpg"
//     }
// ]

const actionTitle = "Add a piece to the collection!";
const actionSubtext = "I will print out any of the art you add onto poster paper and you can take it home after the party."

interface IExhibitionState {
    artItems: IArtItem[]
}

export default class Exhibition extends React.Component<any, IExhibitionState> {
    private onHoverCard = (name: string) => {
        // MixpanelClient.getInstance().track("hover_photo", {"artname" : name})
        console.log("tracked: " + name);
    }

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
                        <Card className={ "exhbition__card" } onMouseEnter={ () => this.onHoverCard(item.art_name) }>
                            <CardMedia
                                className={ "exhbition__cardmedia"}
                                image={ item.art_url }
                                title={ item.art_name }
                            />
                            <CardContent>
                                <Typography gutterBottom={ true } variant="h5" component="h2" color="textPrimary">
                                { item.art_name }
                                </Typography>
                                <Typography color="textSecondary" paragraph={ true }>
                                { item.artist_name }
                                </Typography>
                                <Typography color="textSecondary">
                                <Typography color="textPrimary" display="inline">{item.curator_name}: </Typography>"{ item.curator_notes }"
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                    <Grid item={ true } key={ "add piece" } xs={12} sm={6}>
                        <Card className={ "exhbition__card" } >
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