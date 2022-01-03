export class Ciudad{
    horariosEstacionamiento : string;
    valorHora: number;
    constructor(horarios: string, valor: number){
        this.horariosEstacionamiento = horarios;
        this.valorHora = valor;
    }
}