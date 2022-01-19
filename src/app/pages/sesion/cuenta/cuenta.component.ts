import { Component, OnInit } from '@angular/core';
import { CuentaCorriente } from 'src/app/models/CuentaCorriente';
import { DatosCuentaDTO } from 'src/app/models/DatosCuentaDTO';
import { Historial } from 'src/app/models/Historial';
import { HistorialServiceService } from 'src/app/service/historial-service.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  misDatos!: DatosCuentaDTO;
  mostrar = false;
  cantidad!: number; // monto a cargar


  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  //obtenemos los datos del usuario + su cuenta corriente.
  public cargarDatos(){
    this.usuarioService.getDatos(this.tokenService.getUserName()!).subscribe((data : any) => {
      this.misDatos = new DatosCuentaDTO(data.nombre,data.nombreUsuario,data.email,data.cuentaCorriente);
    });
  }

  //los metodos debitar y cargar deberian ser implementados en un service para cuenta corriente. 
  public cargarSaldo(){
    if(+this.cantidad < 0){
      this.errorMontoNegativo();
    }else{
      if(this.cantidad == undefined){
        this. errorCampoEnBlanco();
      }else{
        if(this.cantidad < 100){
          this.errorMontoInferior()
        }else{
          this.cargaExitosa();
        }
        
      }
    }  
}

  public cargaExitosa(){
    //Si se presiona aceptar entonces se realiza la carga del saldo. 
    //sino se cancela la operacion.
    Swal.fire({
      title: 'Cargando saldo',
      text: 'Usted cargará $' + this.cantidad + ' a su cuenta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result)=> {
      if (result.value){
        let cc = new CuentaCorriente(+this.cantidad,this.misDatos.cuentaCorriente.telefono);
        cc.id = this.misDatos.cuentaCorriente.id;
        this.usuarioService.cargarSaldo(cc).subscribe(data => {
          this.mostrar = false;
          window.location.reload();
        },
        err => {
          Swal.fire({
            width: 350,
            icon: 'error',
            title: err.error.errors[err.error.errors.length-1],
            showConfirmButton: false,
            timer: 2500,
          })
        }
        );
      }
    }) 
  }

 private errorMontoNegativo(){
    Swal.fire('El monto ingresado es invalido', 'Debe ingresar un monto mayor a 0')
  }

  private errorCampoEnBlanco(){
    Swal.fire('El monto ingresado es invalido', 'Debe ingresar un monto')
  }

  private errorMontoInferior(){
    Swal.fire('El monto ingresado es invalido', 'El monto minimo es de $100')
  }
}
