import { CuentaCorriente } from "./CuentaCorriente";

export class Historial{
    horaInicio!: string;
    tipoOperacion!: string
    saldoAnterior!: number;
    cuentaCorriente!: CuentaCorriente;
    monto!: number;
    constructor(horaInicio: string,tipoOperacion: string, saldoAnterior: number,monto: number, cc: CuentaCorriente){
        this.horaInicio = horaInicio;
        this.tipoOperacion = tipoOperacion;
        this.saldoAnterior = saldoAnterior;
        this.cuentaCorriente = cc;
        this.monto = monto;
    }
}