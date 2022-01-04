import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLogged = false;
  nombreUsuario: string | null = '';

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getNombre();
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/login");
  }

}
