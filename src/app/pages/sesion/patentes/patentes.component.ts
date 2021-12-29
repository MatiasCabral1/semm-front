import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Estacionamiento } from 'src/app/models/Estacionamiento';
import { modelPatente } from 'src/app/models/modelPatente';
import { estacionamientoService } from 'src/app/service/estacionamiento.service';
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
  saldo!: any;
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
    ) { }

  ngOnInit(): void {
    this.getPatentes();
    this.getSaldo();
    this.getTiempo();
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
  
  getPatentes():void{
    this.usuarioService.getPatentes().subscribe((data: any) =>{
      this.datos = data;
  })
  }
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
          this.estacionamiento = new Estacionamiento(today.getHours().toString() + ':'+ today.getMinutes().toString(), true, this.datos[row].numero);
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
        this.estacionamientoOn= false;
        clearInterval(this.interval);
        window.location.reload();
      }
    })
    
  }

  getTiempo(){
    this.estacionamientoService.getEstado().subscribe((data: boolean) =>{
      if(data){
        clearInterval(this.interval);
        this.interval = setInterval(()=> this.getTiempo(),60000)
        this.estacionamientoService.getTiempoTranscurrido().subscribe((data: Estacionamiento)=> {
          this.calcularHora(data.horaInicio.split(":")[0],data.horaInicio.split(":")[1]);
          this.estacionamientoOn= true;
        });
      }else{
        console.log("no hay estacionamiento iniciado");
      }
    });
   
  }
  getSaldo():void{
   this.usuarioService.getSaldo().subscribe((data: any) => {
      this.saldo = data.saldo})
    }

    calcularHora(horaInicio:string, minInicio:string){
      let today = new Date();
      if(today.getMinutes() - +minInicio < 0){
        this.time.minutos = 60 + (today.getMinutes() - +minInicio);
        this.time.hora = (today.getHours() - +horaInicio) - 1 ;
      }else{
        this.time.minutos = today.getMinutes() - +minInicio;
        this.time.hora = today.getHours() - +horaInicio;
      }

  }
  clearInterval(){
    clearInterval(this.interval);
  }
  
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

}