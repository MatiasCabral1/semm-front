import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { modelPatente } from 'src/app/models/modelPatente';
import { PatenteService } from 'src/app/service/patente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-patente',
  templateUrl: './edit-patente.component.html',
  styleUrls: ['./edit-patente.component.scss']
})
export class EditPatenteComponent implements OnInit {
  @Input() patente!: modelPatente;
  numero!: any;
  expresiones = {
    tipo1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  }
  
  constructor(
    private patenteService: PatenteService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.numero = this.patente.numero;
  }
  editPatente(){
    console.log("patente obtenida desde listado: ", this.numero);
    if(this.validarExpresiones(this.numero)){
      this.patente.numero = this.numero;
    this.patenteService.update(this.patente).subscribe();
    }
  }

  closeWindow(){
    this.activeModal.close('Close click');
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
}
