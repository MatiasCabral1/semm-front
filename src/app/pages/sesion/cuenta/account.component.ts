import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { CurrentAccount } from 'src/app/models/CurrentAccount';
import { CurrentAccountDataDTO } from 'src/app/models/DTOCurrentAccountData';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentAccountData!: CurrentAccountDataDTO;
  show = false;
  amount!: number; // monto a cargar

  constructor(
    private userService: UserService,
    private localService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  //obtenemos los datos del usuario + su cuenta corriente.
  public loadUserData() {
    this.userService.getData().subscribe((data: any) => {
      this.currentAccountData = new CurrentAccountDataDTO(
        data.name,
        data.username,
        data.email,
        data.currentAccount
      );
    });
  }

  //los metodos debitar y cargar deberian ser implementados en un service para cuenta corriente.
  public chargeBalance() {
    if (+this.amount < 0) {
      this.errorNegativeAmount();
    } else {
      if (this.amount == undefined) {
        this.errorInputEmpty();
      } else {
        if (this.amount < 100) {
          this.errorMinAmount();
        } else {
          this.succesfulCharge();
        }
      }
    }
  }

  public succesfulCharge() {
    //Si se presiona aceptar entonces se realiza la carga del saldo.
    //sino se cancela la operacion.
    Swal.fire({
      title: this.localService.translate(
        'account.component.alert.successfull_charge.title'
      ),
      text:
        this.localService.translate(
          'account.component.alert.successfull_charge.text_start'
        ) +
        this.amount +
        this.localService.translate(
          'account.component.alert.successfull_charge.text_end'
        ),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        let currentAccount = new CurrentAccount(
          +this.amount,
          this.currentAccountData.currentAccount.phone
        );
        currentAccount.id = this.currentAccountData.currentAccount.id;
        this.userService.chargeBalance(currentAccount).subscribe(
          (data) => {
            this.show = false;
            window.location.reload();
          },
          (err) => {
            Swal.fire({
              width: 350,
              icon: 'error',
              title: err.error.errors[err.error.errors.length - 1],
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );
      }
    });
  }

  private errorNegativeAmount() {
    console.log(
      this.localService.translate('account.component.alert.error_amount_title')
    );
    Swal.fire(
      this.localService.translate('account.component.alert.error_amount_title'),
      this.localService.translate(
        'account.component.alert.error.negative_amount'
      ),
      'info'
    );
  }

  private errorInputEmpty() {
    Swal.fire(
      this.localService.translate('account.component.alert.error_amount_title'),
      this.localService.translate('account.component.alert.error.non_amount'),
      'info'
    );
  }

  private errorMinAmount() {
    Swal.fire(
      this.localService.translate('account.component.alert.error_amount_title'),
      this.localService.translate(
        'account.component.alert.error.minimum_amount'
      ),
      'info'
    );
  }
}
