export interface IQuotation {

    name: string;
    mail: string;
    description: string;
    phone: string;
    origin: [string, string];
    destination: [string, string];
    services: Array<number>

}