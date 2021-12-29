export class Estacionamiento{
    id!: number;
    horaInicio: string;
    precioFinal!: number;
    ciudadId!: number;
    iniciado: boolean;
    patente: string;
    username!: string;
    constructor(horaInicio: string, iniciado:boolean, patente: string){
        this.horaInicio = horaInicio;
        this.iniciado = iniciado;
        this.patente = patente;
    }
}