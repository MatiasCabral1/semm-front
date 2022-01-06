import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  misDatos!: NuevoUsuario;
  cuentaCorriente!: any;

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos(){
    this.usuarioService.getDatos(this.tokenService.getUserName()!).subscribe(data => {
      console.log("data: ", data);
      this.misDatos = new NuevoUsuario(data.nombre,data.email,data.nombreUsuario,"");
    });
    this.usuarioService.getCuentaCorriente().subscribe(data=>{
      console.log("data cc:", data)
      this.cuentaCorriente = data;
    })
  }

}
