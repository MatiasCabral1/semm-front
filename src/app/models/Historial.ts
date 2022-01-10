import { CuentaCorriente } from "./CuentaCorriente";

export class Historial{
    horaInicio!: string;
    tipoOperacion!: string
    saldoAnterior!: number;
    cuentaCorriente!: CuentaCorriente;
    constructor(horaInicio: string,tipoOperacion: string, saldoAnterior: number, cc: CuentaCorriente){
        this.horaInicio = horaInicio;
        this.tipoOperacion = tipoOperacion;
        this.saldoAnterior = saldoAnterior;
        this.cuentaCorriente = cc;
    }
}