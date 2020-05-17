import * as React from 'react';
import StaticWelcome from "./StaticWelcome";
import UserDetails from './UserDetails';

import "./NewUser.css";

enum Stage {
    Welcome = 1,
    AddUserDetails
}

interface INewUserState {
    stage: Stage,
    isBusy: boolean
}

export default class SubmitArt extends React.Component<any, INewUserState> {
    constructor(props: any) {
        super(props);

        this.state = {
            stage: Stage.Welcome,
            isBusy: false
        };
    }

    private setIsBusy = (isBusy: boolean) => {
        this.setState({isBusy});
    }

    private onGetStarted = () => {
        this.setState({stage: Stage.AddUserDetails});
    };

    public render() {
        return (
            <React.Fragment>
                {this.state.stage === Stage.Welcome ? (
                    <StaticWelcome
                        moveOn={ this.onGetStarted } />
                ) : (
                    <UserDetails 
                        setIsBusy={ this.setIsBusy } />
                )}
            </React.Fragment>
        );
    }
}