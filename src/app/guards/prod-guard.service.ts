import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProdGuardService {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (!this.tokenService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
