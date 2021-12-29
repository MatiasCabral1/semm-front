export class nuevaPatente {
    user_name!: string;
    number!:string;
    constructor(numero: string, nombreUsuario: string) {
        this.number = numero;
        this.user_name = nombreUsuario;
    }
    
}
