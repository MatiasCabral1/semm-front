import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Ciudad } from 'src/app/models/Ciudad';
import { CuentaCorriente } from 'src/app/models/CuentaCorriente';
import { Estacionamiento } from 'src/app/models/Estacionamiento';
import { Historial } from 'src/app/models/Historial';
import { modelPatente } from 'src/app/models/modelPatente';
import { TiempoPrecioDTO } from 'src/app/models/TiempoPrecioDTO';
import { CiudadService } from 'src/app/service/ciudad.service';
import { estacionamientoService } from 'src/app/service/estacionamiento.service';
import { HistorialServiceService } from 'src/app/service/historial-service.service';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patentes',
  templateUrl: './patentes.component.html',
  styleUrls: ['./patentes.component.scss']
})
export class PatentesComponent implements OnInit {
  mostrar = true;
  ciudad!:Ciudad;
  saldo!: any;
  precio!: number;
  estacionamientoOn = false;
  estacionamiento!: Estacionamiento;
  time = {
    hora : 0,
    minutos : 0
  }
  interval:any;

  datos!: modelPatente[];
  columnas: string[] = [ 'numero','ver', 'editar', 'borrar'];
  eventoselect: modelPatente = new modelPatente("datoModelado" );

  constructor(
    private usuarioService: UsuarioService,
    private estacionamientoService: estacionamientoService,
    private tokenService: TokenService,
    private patenteService: PatenteService,
    private historialService: HistorialServiceService
    ) { }

  ngOnInit(): void {
    this.getPatentes();
    this.getSaldo();
    this.getTiempoYprecio();
  }

  @ViewChild(MatTable) tabla1!: MatTable<modelPatente>;

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  editarFila() {
     {

      this.tabla1.renderRows();
      // routerLink: ["/editar_servicio"],
    }
  }

  //obtenemos las patentes del usuario que inicio sesion.
  getPatentes():void{

    this.usuarioService.getPatentes().subscribe((data: any) =>{
      console.log(data);
      this.datos = data;
      if(data.length == 0){
        this.mostrar = false;
      }
  })
  }

  //verifica que se presione el boton "aceptar"
  //si se presiona aceptar -> se verifica que el saldo de la cuenta del usuario alcance para el minimo de una hora.
  //se crea un estacionamiento en la ddbb, 
  iniciarEstacionamiento(row: number):void{
    Swal.fire({
      title: 'Iniciando estacionamiento',
      text: 'Esta seguro que desea Iniciar estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
      // si presionamos aceptar se ejecuta el la verificacion del saldo
      //si el saldo es menor a 10 -> no se puede iniciar estacionamiento por falta de saldo.
    }).then((result)=> {
      if (result.value){
        if(this.saldo < 10){
          this.errorNotification();
        }else{
          let today = new Date();
          this.estacionamiento = new Estacionamiento(today.toString(), true, this.datos[row].numero);
          this.estacionamiento.username = this.tokenService.getUserName()!;
          //enviamos el estacionamiento-> si devuelve NULL entonces el estacionamiento no se pudo guardar
          // no se pudo guardar porque la patente ya se encuentra en un estacionamiento iniciado.
          this.estacionamientoService.save(this.estacionamiento).subscribe(data => {
          if(data != null){
            this.estacionamientoOn= true;
            window.location.reload();
           }else{
                this.tinyAlert();
            }});
        }

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
        this.estacionamientoService.finalizarEstacionamiento().subscribe();
        this.usuarioService.debitar().subscribe();
        this.cargarHistorial();
        this.estacionamientoOn= false;
        clearInterval(this.interval);
        window.location.reload();
      }
    }) 
  }

  private cargarHistorial(){
    let today = new Date();
    let username = this.tokenService.getUserName()!;
    this.usuarioService.getCuentaCorriente(username).subscribe((data: CuentaCorriente)=>{
      this.historialService.create(new Historial(today.toString(),"Consumo",this.saldo,data)).subscribe(data=>{
        console.log("historial generado", data);
      });
    });
    
  }

  eliminarPatente(row: number){
    let patente = this.datos[row].numero;
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
          this.time.hora = data.horas;
          this.time.minutos = data.minutos
          this.precio = data.precio;
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
  successNotification(){
    Swal.fire('Hi', 'We have been informed!', 'success')
  }
  errorNotification(){
    Swal.fire('No se puede iniciar el estacionamiento', 'Su saldo es insuficiente ', 'error')
  }
  
  tinyAlert(){
    Swal.fire({
      title: 'No se inicio el estacionamiento',
      text: 'La patente seleccionada ya tiene un estacionamiento activo',
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
  ///

}