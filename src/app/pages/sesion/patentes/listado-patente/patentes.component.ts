import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ciudad } from 'src/app/models/Ciudad';
import { Estacionamiento } from 'src/app/models/Estacionamiento';
import { modelPatente } from 'src/app/models/modelPatente';
import { TiempoPrecioDTO } from 'src/app/models/TiempoPrecioDTO';
import { estacionamientoService } from 'src/app/service/estacionamiento.service';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import { EditPatenteComponent } from '../edit-patente/edit-patente.component';
import { RegistrarPatenteComponent } from '../registrar-patente/registrar-patente.component';

@Component({
  selector: 'app-patentes',
  templateUrl: './patentes.component.html',
  styleUrls: ['./patentes.component.scss']
})
export class PatentesComponent implements OnInit {
  mostrar = true;
  saldo!: any;

  estacionamientoOn = false;

  //tiempo transcurrido desde que se inicio estacionamiento y el precio correspondiente.
  tiempoPrecio: TiempoPrecioDTO = new TiempoPrecioDTO(0,0,0);
  interval:any;

  //pagination
  page = 1;
  pageSize = 5;

  datos: modelPatente[] = [];


  constructor(
    private usuarioService: UsuarioService,
    private estacionamientoService: estacionamientoService,
    private tokenService: TokenService,
    private patenteService: PatenteService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getPatentes();
    this.getSaldo();
    this.getTiempoYprecio();
  }

  verificarEstacionamiento(row: number){
    let today = new Date();
      if(this.estacionamientoOn){
        this.finalizarEstacionamiento();
      }else{
        this.iniciarEstacionamiento(row,today);
      }
}

  //verifica que se presione el boton "aceptar"
  //si se presiona aceptar -> se verifica que el saldo de la cuenta del usuario alcance para el minimo de una hora.
  //se crea un estacionamiento en la ddbb, 
  iniciarEstacionamiento(row: number, today :Date):void{
    Swal.fire({
      title: 'Iniciando estacionamiento',
      text: 'Esta seguro que desea Iniciar estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
      // si presionamos aceptar
    }).then((result)=> {
      if (result.value){
        let estacionamiento = new Estacionamiento(today.toString(), true, this.datos[row-1].numero);
        estacionamiento.username = this.tokenService.getUserName()!;
        //enviamos el estacionamiento-> si devuelve NULL entonces el estacionamiento no se pudo guardar
        // no se pudo guardar porque la patente ya se encuentra en un estacionamiento iniciado.
        this.estacionamientoService.save(estacionamiento).subscribe(data => {
            this.estacionamientoOn= true;
            window.location.reload();
        },err =>{
          this.errorIniciarEstacionamiento(err.error.mensaje);
        }  
        );          
    }
    })
  }
  
  //muestra un aviso. 
  //si se presiona aceptar entonces se debita el saldo de la cuenta del usuario.
  //se vuelven a habilitar los botones de iniciar estacionamiento y se elimina el intervalo de "this.interval"
  //se invoca a la funcion "finalizar estacionamiento" del backend.
  finalizarEstacionamiento():void{
    Swal.fire({
      title: 'Finalizando estacionamiento',
      text: 'Esta seguro que desea finalizar el estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result)=> {
      if (result.value){
        let today = new Date();
        this.estacionamientoService.finalizarEstacionamiento().subscribe(data=>{
          console.log("data: ", data);
          this.estacionamientoOn= false;
          clearInterval(this.interval);
          window.location.reload();
        },err=>{
          console.log("error: ",err);
          this.errorFinalizarEstacionamiento(err.error.mensaje);
        });
        
        
      }
    }) 
  }


  //obtenemos las patentes del usuario que inicio sesion.
  getPatentes():void{

    this.usuarioService.getPatentes().subscribe((data: any) =>{
      this.datos = data;
      if(data.length == 0){
        this.mostrar = false;
      }
  })
  }

  eliminarPatente(row: number){
    let patente = this.datos[row-1].numero;
    this.patenteService.delete(patente,this.tokenService.getUserName()!).subscribe(data=>{
      this.alertaDelete(data.mensaje);
    });
    
  }
  //verificamos que haya una patente iniciada, si no hay ninguna iniciada se informa en la consola
  //sino se setea el intervalo de invocacion de esta funcion cada 1 minuto.
  getTiempoYprecio(){
    this.estacionamientoService.getEstado().subscribe((data: boolean) =>{
      if(data){
        clearInterval(this.interval);
        this.interval = setInterval(()=> this.getTiempoYprecio(),60000)
        this.estacionamientoService.getTiempoTranscurrido().subscribe((data: TiempoPrecioDTO)=> {
          console.log("contenido de getHora: ", data);
          this.tiempoPrecio.horas = data.horas;
          this.tiempoPrecio.minutos = data.minutos
          this.tiempoPrecio.precio = data.precio;
          this.estacionamientoOn= true;
        });
      }
    });
   
  }

  //obtenemos la cuenta corriente del usuario y seteamos nuestra variable "this.saldo" con "cuentaCorriente.saldo"
  getSaldo():void{
    let username = this.tokenService.getUserName()!;
   this.usuarioService.getCuentaCorriente(username).subscribe((data: any) => {
     console.log(data);
      this.saldo = data.saldo})
    }

  // alertas y notificaciones de sweetAlert2
  errorHora(){
    Swal.fire('No se puede iniciar el estacionamiento', 'Fuera del horario operable!', 'error')
  }
  errorNotification(){
    Swal.fire('No se puede iniciar el estacionamiento', 'Su saldo es insuficiente ', 'error')
  }

  avisoDiasNoHabiles(){
    Swal.fire('No se puede iniciar el estacionamiento', 'No se puede operar en dias no habiles ', 'error')
  }
  
  errorIniciarEstacionamiento(mensaje: string){
    Swal.fire({
      title: 'No se inicio el estacionamiento',
      text: mensaje,
      icon: 'warning',
    })
  }

  errorFinalizarEstacionamiento(mensaje: string){
    Swal.fire({
      title: 'No pudo finalizar el estacionamiento',
      text: mensaje,
      icon: 'warning',
    })
  }
  
  alertaDelete(mensaje: string){
    Swal.fire({
      title: mensaje,
      icon: 'success',
    }).then((result)=> {
      if (result.value){
        window.location.reload();
      }
  })
}
  ///modal registrar patente
  savePatente() {
    this.modalService.open(RegistrarPatenteComponent);
  }
//editarPatente
editPatente(row: number){
  let patente = this.datos[row-1];
  const modalRef = this.modalService.open(EditPatenteComponent);
  modalRef.componentInstance.patente = patente;
}
}