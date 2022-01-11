import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { modelPatente } from 'src/app/models/modelPatente';
import { nuevaPatente } from 'src/app/models/nueva-patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-patente',
  templateUrl: './registrar-patente.component.html',
  styleUrls: ['./registrar-patente.component.scss']
})
export class RegistrarPatenteComponent implements OnInit {
 numero!: any;
 usuarioPatente! : nuevaPatente;
 expresiones = {
   tipo1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
 }

  constructor(
    private patenteService: PatenteService,
    private tokenService: TokenService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  registrarPatente(){
    if(this.validarExpresiones(this.numero)){
      this.usuarioPatente = new nuevaPatente(this.numero,this.tokenService.getUserName()!);
      this.patenteService.create(this.numero,this.tokenService.getUserName()!).subscribe((data: any) => {
        this.notificacionGuardado();
      },
      err =>{
        this.errorEnGuardado(err.error.mensaje);
      }); 
    }
  }

  validarExpresiones(patente: any): boolean{
    //valida que la patente ingresada cumpla con el formato tipo1
    // si no lo cumple lo informa en pantalla.
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion. 
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation1 = patente.match(this.expresiones.tipo1);
    if(validation1 != null){
      if(validation1[0] == patente){
        return true;
      }else{
        this.errorNotificationExpresion();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorNotificationExpresion();
    return false;
      
  }
  
  errorNotificationExpresion(){
    Swal.fire('El formato ingresado es invalido', 'Ejemplos de formatos aceptados: "AAA999" - "AA000AA"', 'error')
  }

  errorEnGuardado(mensaje: string){
    console.log(mensaje);
    Swal.fire({
      width: 350,
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
    })
  }

  notificacionGuardado(){
    Swal.fire({
      width: 350,
      icon: 'success',
      title: "patente registrada correctamente",
      showConfirmButton: true,
    }).then((result)=> {
      if (result.value){
        window.location.reload();
      }
  })
}
  //expresiones regulares AAA999 -> /\D\D\D\d\d\d/gm
  //formato mercosur -> /\D\D\d\d\d\D\D/gm

}
