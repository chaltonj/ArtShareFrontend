export interface IArtItem {
    id: number;
    created: Date;
    art_url: string;
    art_name: string;
    artist_name: string;
    curator_name: string;
    curator_notes: string;
}

export interface ICurator {
    id: number;
    name: string;
    created: Date;
}

export const config =  {
    baseUrl: "http://0.0.0.0:8000"
}

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