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

}
