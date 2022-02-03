import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NewUser } from '../models/NewUser';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUser!: NewUser;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  errMsj!: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.newUser = new NewUser(
      this.name,
      this.username,
      this.email,
      this.password
    );
    this.authService.save(this.newUser).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
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
}
