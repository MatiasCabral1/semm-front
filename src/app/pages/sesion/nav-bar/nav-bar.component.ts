import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.setDataSession();
  }
  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl('/login');
  }

  setDataSession() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
