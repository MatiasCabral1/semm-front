import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(): boolean {
    if (this.tokenService.isLogged()) {
      this.tokenService.logOut();
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
