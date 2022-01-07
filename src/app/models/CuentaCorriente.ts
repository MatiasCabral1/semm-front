export class CuentaCorriente{
    id!: number;
    telefono!:string;
    saldo!: number;
    constructor(saldo: number, telefono: string) {
        this.saldo = saldo;
        this.telefono = telefono;
    }
}