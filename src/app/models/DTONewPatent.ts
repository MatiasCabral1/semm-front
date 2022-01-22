export class NewPatentDTO {
    user_name!: string;
    number!:string;
    constructor(number: string, username: string) {
        this.number = number;
        this.user_name = username;
    }
    
}
