export class modelPatente{
    id!: number;
    numero: string;
    constructor(patente: string){
        this.numero = patente;
    }
}