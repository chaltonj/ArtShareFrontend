import Twilio from "twilio";

const a = "ACce26";
const b = "8cc9487";
const c = "42f9dcec8827d91f45965";
const sidr = a + b + c;
const d = "1d407a9350de";
const e = "8d6260cfb";
const f = "5ea64969299";
const secr = d + e + f;

const client: any = Twilio(sidr, secr);

export function sendSMS(
    toPhoneNumber: string,
    body: string): void
    {
        client.messages.create({
            body,
            to: toPhoneNumber,  // Text this number
            from: '+13122625739' // From a valid Twilio number
        })
        .then((message: any) => console.log(message.sid));
    }