import axios from 'axios';

const defaultTemplateId = "InitialTemplate";

// assuming the base url might work in prod. Not sure.
const baseUrl =  process.env.NODE_ENV === 'development'
    ? "http://0.0.0.0:8000"
    :  "https://artshare-backend-b2.azurewebsites.net";

export interface IUser {
    name: string,
    phone_number: string,
    template_id: string,
    user_id: string
}

export interface ISubmission {
    photo_url: string,
    submission_id: string,
    template_id: string,
    user_id: string,
    responses?: IResponse[]
}

export interface IResponse {
    response_id: string,
    submission_id: string,
    template_id: string,
    text: string,
    user_id: string
}

export function getUser(
    userId: string,
    callback: (user: IUser) => void) {
        const queryParams = {
            user_id: userId,
            template_id: defaultTemplateId
        };
        axios.get("/user",
            {
                baseURL: baseUrl,
                params: queryParams
            }).then(res => {
                if (res.status === 200) {
                    callback(res.data);
                } else {
                    console.log("failed get user: " + res);
                }
            });
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

export function getSubmissions(
    userId: string,
    callback: (submissions: ISubmission[]) => void) {
        const queryParams = {
            user_id: userId,
            template_id: defaultTemplateId
        };
        axios.get("/submissions",
            {
                baseURL: baseUrl,
                params: queryParams
            }).then(res => {
                if (res.status === 200) {
                    callback(res.data);
                } else {
                    console.log("failed get submissions: " + res);
                }
            });
    }

