export class Persona{
    id!: number;
    telefono!: number;
    passwd!: string;

    constructor(telefono: number, passwd: string){
        this.telefono = telefono;
        this.passwd = passwd;
    }
}