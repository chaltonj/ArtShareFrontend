import {
    Box,
    Button,
    Grid
    }
    from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';

import { config, IArtItem } from 'src/data/models';
import { ArtCard } from "../../components";
import AddArtDetails from "./AddArtDetails";
import AddPersonalDetails from "./AddPersonalDetails";
import "./Create.css";

enum SubmitStage {
    ChooseArt = 1,
    AddNotes,
}

interface ISubmitArtState {
    artPhoto?: File,
    artPhotoUrl: string,
    artName: string,
    artistName: string,
    curatorName: string,
    curatorNotes: string,
    submitStage: SubmitStage
}

const NameKey = "curatorName";

export default class SubmitArt extends React.Component<any, ISubmitArtState> {

    constructor(props: any) {
        super(props);
        // this.state = { artPhoto: undefined, artName: "", artistName: "", curatorName: "", curatorNotes: "" };
        const storedName = localStorage.getItem(NameKey);

        this.state = {
            artPhoto: undefined,
            artPhotoUrl: "",
            artName: "tesseract #4",
            artistName: "Loki",
            curatorName: storedName ? storedName : "",
            curatorNotes: "This shit is tight man, i don't care who you are.",
            submitStage: SubmitStage.ChooseArt
        };
    }

    private onChangeFiles = (files: FileList) => {
        if (files && files[0]) {
            this.setState({artPhoto: files[0], artPhotoUrl: URL.createObjectURL(files[0])});
        }
    };
    private onChangeArtName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({artName: event.target.value});
    };
    private onChangeArtistName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({artistName: event.target.value});
    };
    private onChangeCuratorName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({curatorName: event.target.value});
    };
    private onChangeCuratorNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({curatorNotes: event.target.value});
    };

    private submitArt = () => {
        const formData = new FormData();
        if (this.state.artPhoto) {
            formData.append("artPhoto", this.state.artPhoto.slice(), this.state.artPhoto.name);
        }
        formData.append("artName", this.state.artName);
        formData.append("artistName", this.state.artistName);
        formData.append("curatorName", this.state.curatorName);
        formData.append("curatorNotes", this.state.curatorNotes);
        axios.post("/artdisplay",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                baseURL: config.baseUrl
            })
            .then(res => {
                const createdArtItem = res.data as IArtItem
                localStorage.setItem(NameKey, createdArtItem.curator_name);
                window.location.replace("/");
            });
    };

    private handleBackPress = () => {
        this.setState({submitStage: SubmitStage.ChooseArt });
    }
    private handleForwardPress = () => {
        if (this.state.submitStage === SubmitStage.ChooseArt) {
            this.setState({submitStage: SubmitStage.AddNotes});
        } else {
            this.submitArt();
        }
    }
    private getButtonLabel = (stage: SubmitStage) => {
        return stage === SubmitStage.ChooseArt ? "Next" : "Submit";
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.submitStage === SubmitStage.ChooseArt ? (
                    <AddArtDetails
                        files={ this.state.artPhotoUrl ? [this.state.artPhotoUrl] : undefined }
                        onChangeFiles={ this.onChangeFiles }
                        artName={ this.state.artName }
                        onChangeArtName={ this.onChangeArtName }
                        artistName={ this.state.artistName }
                        onChangeArtistName={ this.onChangeArtistName }
                    />
                ) : (
                    <React.Fragment>
                        <ArtCard
                            imgUrl={ this.state.artPhotoUrl }
                            artName={ this.state.artName }
                            artistName={ this.state.artistName }
                        />
                        <Box mt={ 2 }>
                            <AddPersonalDetails
                                curatorName={ this.state.curatorName }
                                onChangeCuratorName={ this.onChangeCuratorName }
                                curatorNotes={ this.state.curatorNotes }
                                onChangeCuratorNotes={ this.onChangeCuratorNotes }
                            />
                        </Box>
                    </React.Fragment>
                )}
                <Box mt={ 2 }>
                    <Grid
                        justify="space-between"
                        spacing={10}
                        container>
                        <Grid item>
                            <Button
                                className={ "create__button" }
                                variant="contained"
                                disabled={ this.state.submitStage === SubmitStage.ChooseArt }
                                onClick={ this.handleBackPress }>
                                Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                className={ "create__button" }

                                variant="contained"
                                color="primary"
                                onClick={ this.handleForwardPress }>
                                { this.getButtonLabel(this.state.submitStage) }
                            </Button>
                        </Grid>
                    </Grid>
                </Box> 
            </React.Fragment>
        );
    }
}