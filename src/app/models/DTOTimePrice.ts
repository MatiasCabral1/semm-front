export class TimePriceDTO
 {
    hours!: number;
    minutes!: number;
    price!: number ;
    constructor(hours:number,minutes:number,price: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.price = price;
    }   
}

