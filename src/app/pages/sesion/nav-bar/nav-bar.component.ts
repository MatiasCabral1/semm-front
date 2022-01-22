import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLogged = false;
  username!: string;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.username = this.tokenService.getName()!;
    } else {
      this.isLogged = false;
      this.username = '';
    }
  }
  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/login");
  }

}
