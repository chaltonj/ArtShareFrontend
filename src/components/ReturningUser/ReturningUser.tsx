import * as React from 'react';
import { getSubmissions, getUser, IResponse, ISubmission, IUser } from "../../data";
import Loading from "../Loading/Loading";
import NewResponses from "./NewResponses";
import NewSubmission from "./NewSubmission";
import ViewSubmissions from "./ViewSubmissions";

import "./ReturningUser.css";

enum Stage {
    CreateSubmission = 1,
    CreateResponses,
    ViewSubmissions
}

interface IReturningUserProps {
    userId: string
}

interface IReturningUserState {
    user?: IUser,
    stage: Stage,
    isBusy: boolean,
    submissions: ISubmission[]
}

export default class ReturningUser extends React.Component<IReturningUserProps, IReturningUserState> {
    constructor(props: any) {
        super(props);

        this.state = {
            stage: Stage.CreateSubmission,
            user: undefined,
            isBusy: true,
            submissions: []
        };
    }

    public componentDidMount = () => {
        // get user and submissions and mark isBusy false
        getUser(this.props.userId,
            (user: IUser) => {
                getSubmissions(
                    this.props.userId,
                    (submissions: ISubmission[]) => {
                    const stage = this.getStageFromSubmissions(submissions, this.props.userId);
                    this.setState({ user, submissions, stage, isBusy: false });
                });
            });
    }

    private getStageFromSubmissions = (
        submissions: ISubmission[],
        userId: string): Stage => {
        if (!this.getUserSubmission(submissions, userId)) {
            return Stage.CreateSubmission;
        } else if (this.getNonRespondedSubmissions(submissions, userId).length > 0) {
            return Stage.CreateResponses;
        } else {
            return Stage.ViewSubmissions;
        }
    }

    private getUserSubmission = (
        submissions: ISubmission[],
        userId: string): ISubmission | undefined => {
        return submissions.find( (submission: ISubmission) => submission.user_id === userId);
    }

    private getNonRespondedSubmissions = (
        submissions: ISubmission[],
        userId: string): ISubmission[] => {
        return submissions.filter( (submission: ISubmission) => {
            const hasResponded = submission.responses?.some((response: IResponse) => response.user_id === userId );
            return !hasResponded;
        });
    }

    // private setIsBusy = (isBusy: boolean) => {
    //     this.setState({isBusy});
    // }

    public render() {
        return (
            <React.Fragment>
                {
                    this.state.isBusy 
                        ? <Loading />
                        : this.state.stage === Stage.CreateSubmission
                            ? <NewSubmission />
                            : this.state.stage === Stage.CreateResponses
                                ? <NewResponses />
                                : <ViewSubmissions />
                }   
            </React.Fragment>
        );
    }
}