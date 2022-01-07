import { CuentaCorriente } from "./CuentaCorriente";

export class DatosCuentaDTO {
    id!: number;
    nombre!: string;
    nombreUsuario!: string;
    email!: string;
    cuentaCorriente!:CuentaCorriente
    constructor(nombre: string, nombreUsuario: string, email: string, cc: CuentaCorriente ) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.cuentaCorriente = cc;
    }   
}
