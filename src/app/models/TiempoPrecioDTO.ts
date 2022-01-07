export class TiempoPrecioDTO {
    horas!: number;
    minutos!: number;
    precio!: number ;
    constructor(horas:number,minutos:number,precio: number) {
        this.horas = horas;
        this.minutos = minutos;
        this.precio = precio;
    }   
}

