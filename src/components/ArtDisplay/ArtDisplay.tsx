import * as React from 'react';

import { IArtItem } from "../../data/models";
import "./ArtDisplay.css";

interface IArtDisplayProps {
    item: IArtItem,
    key: number
}

export default class ArtDisplay extends React.Component<IArtDisplayProps> {
    public render() {
        const { item, key } = this.props;
        return (
            <div className="artdisplay__container" key={ key }>
                <img className={ "artdisplay__photo" } src={ item.art_url } />
                <div className={ "artdisplay__caption" }>
                    <div className={ "artdisplay__name" }>{ item.art_name }</div>
                    <div className={ "artdisplay__artistname" }>{ item.artist_name }</div>
                </div>
            </div>
        );
    }
}