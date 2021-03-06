import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parking } from 'src/app/models/Estacionamiento';
import { Patent } from 'src/app/models/Patent';
import { TimePriceDTO } from 'src/app/models/DTOTimePrice';
import { ParkingService } from 'src/app/service/Parking.service';
import { PatentService } from 'src/app/service/Patent.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';
import { EditPatentComponent } from '../edit-patent/edit-patent.component';
import { RegisterPatentComponent } from '../registrar-patente/register-patent.component';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@Component({
  selector: 'app-patents',
  templateUrl: './patents.component.html',
  styleUrls: ['./patents.component.scss'],
})
export class PatentsComponent implements OnInit {
  show = true;
  balance!: any;

  parkingOn = false;

  //tiempo transcurrido desde que se inicio estacionamiento y el precio correspondiente.
  TimePrice: TimePriceDTO = new TimePriceDTO(0, 0, 0);
  interval: any;

  //pagination
  page = 1;
  pageSize = 5;

  listPatents: Patent[] = [];

  constructor(
    private userService: UserService,
    private parkingService: ParkingService,
    private tokenService: TokenService,
    private patentService: PatentService,
    private modalService: NgbModal,
    private localService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.getPatents();
    this.getBalance();
    this.getTimePrice();
  }

  verifyParking(row: number) {
    let today = new Date();
    if (this.parkingOn) {
      this.endParking();
    } else {
      this.startParking(row, today);
    }
  }

  //verifica que se presione el boton "aceptar"
  //si se presiona aceptar -> se verifica que el saldo de la cuenta del usuario alcance para el minimo de una hora.
  //se crea un estacionamiento en la ddbb,
  startParking(row: number, today: Date): void {
    Swal.fire({
      title: 'Iniciando estacionamiento',
      text: 'Esta seguro que desea Iniciar estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      // si presionamos aceptar
    }).then((result) => {
      if (result.value) {
        let parking = new Parking(
          today.toString(),
          true,
          this.listPatents[row - 1].number
        );
        parking.user.id = this.tokenService.getIdUser();
        this.parkingService.save(parking).subscribe(
          (data) => {
            this.parkingOn = true;
            window.location.reload();
          },
          (err) => {
            this.errorStartParking(err.error.mensaje);
          }
        );
      }
    });
  }

  //obtenemos el id del usuario del username enviado.

  //muestra un aviso.
  //si se presiona aceptar entonces se debita el saldo de la cuenta del usuario.
  //se vuelven a habilitar los botones de iniciar estacionamiento y se elimina el intervalo de "this.interval"
  //se invoca a la funcion "finalizar estacionamiento" del backend.
  endParking(): void {
    Swal.fire({
      title: this.localService.translate(
        'patent.list.component.alert.text_end_parking.title'
      ),
      text: this.localService.translate(
        'patent.list.component.alert.text_end_parking.text'
      ),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.localService.translate(
        'patent.list.component.alert.text_end_parking.button.accept'
      ),
      cancelButtonText: this.localService.translate(
        'patent.list.component.alert.text_end_parking.button.cancel'
      ),
    }).then((result) => {
      if (result.value) {
        this.parkingService.endParking(this.tokenService.getIdUser()).subscribe(
          (data) => {
            this.parkingOn = false;
            clearInterval(this.interval);
            window.location.reload();
          },
          (err) => {
            console.log(err.error.mensaje);
            this.errorEndParking(err.error.mensaje);
          }
        );
      }
    });
  }

  //obtenemos las patentes del usuario que inicio sesion.
  getPatents(): void {
    this.userService.getPatents().subscribe((data: any) => {
      this.listPatents = data;
      if (data.length == 0) {
        this.show = false;
      }
    });
  }

  deletePatent(row: number) {
    let patent = this.listPatents[row - 1];
    this.patentService.delete(patent.id).subscribe(
      (data) => {
        this.alertDelete(data.mensaje);
      },
      (err) => {
        this.errorDelete(err.error.mensaje);
      }
    );
  }

  //verificamos que haya una patente iniciada, si no hay ninguna iniciada se informa en la consola
  //sino se setea el intervalo de invocacion de esta funcion cada 1 minuto.
  getTimePrice() {
    //obtengo el id del usuario logeado.
    let idUser = this.tokenService.getIdUser();
    this.parkingService
      .getParkingStartedByUser(idUser)
      .subscribe((data: boolean) => {
        if (data) {
          clearInterval(this.interval);
          this.interval = setInterval(() => this.getTimePrice(), 60000);
          this.parkingService
            .getTime(idUser)
            .subscribe((data: TimePriceDTO) => {
              this.TimePrice.hours = data.hours;
              this.TimePrice.minutes = data.minutes;
              this.TimePrice.price = data.price;
              this.TimePrice.patent = data.patent;
              this.parkingOn = true;
            });
        }
      });
  }

  //obtenemos la cuenta corriente del usuario y seteamos nuestra variable "this.saldo" con "cuentaCorriente.saldo"
  getBalance(): void {
    this.userService.getCurrentAccount().subscribe((data: any) => {
      this.balance = data.balance;
    });
  }

  // alertas y notificaciones de sweetAlert2
  errorStartParking(mensaje: string) {
    Swal.fire({
      title: this.localService.translate(
        'patent.list.component.alert.error.start_parking'
      ),
      text: mensaje,
      icon: 'warning',
    });
  }

  errorEndParking(mensaje: string) {
    Swal.fire({
      title: this.localService.translate(
        'patent.list.component.alert.error.end_parking'
      ),
      text: mensaje,
      icon: 'warning',
    });
  }
  errorDelete(mensaje: string) {
    Swal.fire({
      title: this.localService.translate(
        'patent.list.component.alert.error.delete_patent'
      ),
      text: mensaje,
      icon: 'warning',
    });
  }

  alertDelete(mensaje: string) {
    Swal.fire({
      title: mensaje,
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
  ///modal registrar patente
  savePatent() {
    this.modalService.open(RegisterPatentComponent);
  }
  //editarPatente
  editPatent(row: number) {
    let patent = this.listPatents[row - 1];
    const modalRef = this.modalService.open(EditPatentComponent);
    modalRef.componentInstance.patent = patent;
  }
}
