import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelPatente } from 'src/app/models/modelPatente';
import { nuevaPatente } from 'src/app/models/nueva-patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-registrar-patente',
  templateUrl: './registrar-patente.component.html',
  styleUrls: ['./registrar-patente.component.scss']
})
export class RegistrarPatenteComponent implements OnInit {
 numero!: any;
 usuarioPatente! : nuevaPatente;
 expresiones = {
   tipo1: /\D{3}\d{3}/,
   tipo2: /\D\D\d\d\d\D\D/gm
 }

  constructor(
    private patenteService: PatenteService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrarPatente(){
    this.usuarioPatente = new nuevaPatente(this.numero,this.tokenService.getUserName()!);
    this.patenteService.create(this.numero,this.tokenService.getUserName()!).subscribe();
    this.router.navigateByUrl("/listadoPatentes");
  }

  validarExpresiones(){
    let patente= "aaa29922"; 
    const validation = patente.match(this.expresiones.tipo1);
      console.log("cumple con la expresion",validation?.values().next().value);
  }
  //expresiones regulares AAA999 -> /\D\D\D\d\d\d/gm
  //formato mercosur -> /\D\D\d\d\d\D\D/gm

}
