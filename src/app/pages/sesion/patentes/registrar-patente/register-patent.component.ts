import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPatentDTO } from 'src/app/models/DTONewPatent';
import { Patent } from 'src/app/models/Patent';
import { PatentService } from 'src/app/service/Patent.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-patent',
  templateUrl: './register-patent.component.html',
  styleUrls: ['./register-patent.component.scss']
})
export class RegisterPatentComponent implements OnInit {
 number!: any;
 newPatent! : Patent;
 expression = {
   type1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
 }

  constructor(
    private patentService: PatentService,
    private tokenService: TokenService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  savePatent(){
    if(this.validateExpression(this.number)){
      this.newPatent = new Patent(this.number,this.tokenService.getUsername()!);
      this.patentService.create(this.newPatent).subscribe((data: any) => {
        console.log("patente registrada: ", this.newPatent);
        this.notifySave();
      },
      err =>{
        this.errorSave(err.error.mensaje);
      }); 
    }
  }

  validateExpression(patent: any): boolean{
    //valida que la patente ingresada cumpla con el formato tipo1
    // si no lo cumple lo informa en pantalla.
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion. 
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation1 = patent.match(this.expression.type1);
    if(validation1 != null){
      if(validation1[0] == patent){
        return true;
      }else{
        this.errorExpression();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorExpression();
    return false;
      
  }
  
  errorExpression(){
    Swal.fire('El formato ingresado es invalido', 'Ejemplos de formatos aceptados: "AAA999" - "AA000AA"', 'error')
  }

  errorSave(mensaje: string){
    console.log(mensaje);
    Swal.fire({
      width: 350,
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
    })
  }

  notifySave(){
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
}
