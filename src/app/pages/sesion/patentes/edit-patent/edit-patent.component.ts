import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { Patent } from 'src/app/models/Patent';
import { PatentService } from 'src/app/service/Patent.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-patent',
  templateUrl: './edit-patent.component.html',
  styleUrls: ['./edit-patent.component.scss'],
})
export class EditPatentComponent implements OnInit {
  @Input() patent!: Patent;
  number!: any;
  namePatent!: string;

  expression = {
    type1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  };

  constructor(
    private patentService: PatentService,
    public activeModal: NgbActiveModal,
    private tokenService: TokenService,
    private localService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.number = this.patent.number;
    this.findById();
  }
  editPatent() {
    if (this.validateExpression(this.number)) {
      this.patent.number = this.namePatent;
      let patenteEdit = new Patent(
        this.patent.number,
        this.tokenService.getUsername()!
      );
      patenteEdit.id = this.patent.id;
      this.patentService.update(patenteEdit).subscribe(
        (data) => {
          this.notificacionSaved();
        },
        (err) => {
          this.errorEdit(err.error.mensaje);
        }
      );
      // }
    }
  }
  closeWindow() {
    this.activeModal.close('Close click');
  }

  findById() {
    this.patentService.get(this.patent.id).subscribe({
      next: (data: Patent) => {
        this.namePatent = data.number;
        this.patent = data;
      },
      error: (err) => {
        console.log('se produjo un error');
      },
    });
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
        this.errorExpressionNotification();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorExpressionNotification();
    return false;
  }

  errorExpressionNotification() {
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
  errorEdit(mensaje: string) {
    Swal.fire({
      width: 350,
      icon: 'warning',
      title: mensaje,
      showConfirmButton: true,
    });
  }

  notificacionSaved() {
    Swal.fire({
      width: 350,
      icon: 'success',
      title: this.localService.translate('patent.edit.component.alert.sucess'),
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
}
