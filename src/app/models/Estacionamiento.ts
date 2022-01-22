export class Parking{
    id!: number;
    date: string;
    started: boolean;
    patent: string;
    username!: string;
    constructor(date: string, started:boolean, patent: string){
        this.date = date;
        this.started = started;
        this.patent = patent;
    }
}