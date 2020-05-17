import axios from 'axios';

const defaultTemplateId = "InitialTemplate";

// assuming the base url might work in prod. Not sure.
const baseUrl =  process.env.NODE_ENV === 'development'
    ? "http://0.0.0.0:8000"
    :  "https://artshare-backend-b2.azurewebsites.net";

// export interface IArt {
//     id: number;
//     lastModifiedOn: Date;
//     blobUri: string;
//     name: string;
//     artist: string;
//     curator: string;
//     curatorNotes: string;
// }

// export function getArtDisplays(callback: (artItems: IArt[]) => void) {
//     axios.get("api/art",
//     {
//         baseURL: baseUrl
//     }).then(res => {
//         console.log(res);
//         console.log(res.data);
//         if (!("error" in res.data)) {
//             console.log(res.data as IArt[]);
//             callback(res.data);
//         }
//     });
// }

export interface IUser {
    name: string,
    phone_number: string,
    template_id: string,
    user_id: string
}

export function submitUser(
    name: string,
    phoneNumber: string,
    callback: (user: IUser) => void) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone_number", phoneNumber);
        formData.append("template_id", defaultTemplateId);
        axios.post("/user",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                baseURL: baseUrl
            })
            .then(res => {
                if (res.status === 200) {
                    callback(res.data);
                } else {
                    console.log("failed put user: " + res);
                }
            });
}