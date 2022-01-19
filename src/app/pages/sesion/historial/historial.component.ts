import { Component, OnInit } from '@angular/core';
import { CuentaCorriente } from 'src/app/models/CuentaCorriente';
import { Historial } from 'src/app/models/Historial';
import { HistorialServiceService } from 'src/app/service/historial-service.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historial  : Historial[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private historialService: HistorialServiceService,
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getHistorial();
  }

  public getHistorial(){
   let username = this.tokenService.getUserName()!;
    this.usuarioService.getCuentaCorriente(username).subscribe((data: CuentaCorriente) =>{
      console.log("id de cuenta corriente obtenida: ", data.id);
      this.historialService.getByCc(data.id).subscribe((data)=>{
        console.log("historial obtenido: ", data);
        this.historial = data;
        this.historial.forEach(function(h){
          let fecha = new Date(h.horaInicio);
          h.horaInicio = fecha.toLocaleDateString() + '  '+ fecha.toLocaleTimeString();
        });
        //ordeno el historial para que se muestren los ultimos movimientos al principio del listado.
        this.historial.sort((a, b) => (a.horaInicio < b.horaInicio) ? 1 : -1)

      });
    });
    
  }
}
