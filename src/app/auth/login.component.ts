import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario! : LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] | null = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;
      this.setDatosUsuario(data);
      this.roles = data.authorities;
      this.router.navigate(['/sesion']);
    },
    err => {
      this.isLogged = false;
      this.isLoginFail = true;
      Swal.fire({
        width: 350,
        icon: 'error',
        title: err.error.mensaje,
        showConfirmButton: false,
        timer: 2500,
      })
    }
    );
  }
  setDatosUsuario(data: any){ 
    this.tokenService.setToken(data.token);
    this.tokenService.setUserName(data.nombreUsuario);
    this.usuarioService.getDatos(data.nombreUsuario).subscribe(data =>{
      this.tokenService.setNombre(data.nombre);

      console.log("set datos", data.nombre);
      console.log("get token: ", this.tokenService.getNombre());
    });
    
  }

}
