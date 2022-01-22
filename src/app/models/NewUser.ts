export class NewUser {
    id!: number;
    name!: string;
    username!: String;
    email!: string;
    password!: string;
    authorities!: string[];
    currentAccount!:{
        id:number,
        saldo:number,
    };
    constructor(name: string, username: string, email: string, password: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }   
}
