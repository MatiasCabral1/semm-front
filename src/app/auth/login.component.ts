import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUser } from '../models/LoginUser';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/User.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  username!: string;
  password!: string;
  roles: string[] | null = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      (data) => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.setUserData(data);
        this.roles = data.authorities;
        this.router.navigate(['/sesion']);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        Swal.fire({
          width: 350,
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }
  setUserData(data: any) {
    this.tokenService.setToken(data.token);
  }
}
