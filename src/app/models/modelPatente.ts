import { NuevoUsuario } from "./nuevo-usuario";

export class modelPatente{
    id!: number;
    numero: string;
    usuario!: NuevoUsuario;
    constructor(patente: string){
        this.numero = patente;
    }
}