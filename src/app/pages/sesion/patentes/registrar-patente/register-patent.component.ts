import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { Patent } from 'src/app/models/Patent';
import { PatentService } from 'src/app/service/Patent.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-patent',
  templateUrl: './register-patent.component.html',
  styleUrls: ['./register-patent.component.scss'],
})
export class RegisterPatentComponent implements OnInit {
  number!: any;
  newPatent!: Patent;
  expression = {
    type1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  };

  constructor(
    private patentService: PatentService,
    private tokenService: TokenService,
    public activeModal: NgbActiveModal,
    private localService: LocalizationService
  ) {}

  ngOnInit(): void {}

  savePatent() {
    if (this.validateExpression(this.number)) {
      this.newPatent = new Patent(
        this.number,
        this.tokenService.getUsername()!
      );
      this.patentService.create(this.newPatent).subscribe(
        (data: any) => {
          this.notifySave();
        },
        (err) => {
          this.errorSave(err.error.mensaje);
        }
      );
    }
  }

  validateExpression(patent: any): boolean {
    //valida que la patente ingresada cumpla con el formato tipo1
    // si no lo cumple lo informa en pantalla.
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion.
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation1 = patent.match(this.expression.type1);
    if (validation1 != null) {
      if (validation1[0] == patent) {
        return true;
      } else {
        this.errorExpression();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorExpression();
    return false;
  }

  errorExpression() {
    Swal.fire(
      this.localService.translate(
        'patent.edit.component.alert.error.expression.title'
      ),
      this.localService.translate(
        'patent.edit.component.alert.error.expression.text'
      ),
      'error'
    );
  }

  errorSave(mensaje: string) {
    Swal.fire({
      width: 350,
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  notifySave() {
    Swal.fire({
      width: 350,
      icon: 'success',
      title: this.localService.translate(
        'patent.register.component.alert.success'
      ),
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
}
