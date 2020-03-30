import axios from 'axios';

// assuming the base url might work in prod. Not sure.
const baseUrl =  process.env.NODE_ENV === 'development'
    ? "http://localhost:7071"
    :  window.location.origin;

export interface IArt {
    id: number;
    lastModifiedOn: Date;
    blobUri: string;
    name: string;
    artist: string;
    curator: string;
    curatorNotes: string;
}

export function getArtDisplays(callback: (artItems: IArt[]) => void) {
    axios.get("api/art",
    {
        baseURL: baseUrl
    }).then(res => {
        console.log(res);
        console.log(res.data);
        if (!("error" in res.data)) {
            console.log(res.data as IArt[]);
            callback(res.data);
        }
    });
}
