import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  roles: Array<string> = [];

  constructor() {}

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return ' ';
    }
    const token = this.getToken()!;
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public getIdUser(): any {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken()!;
    const payload = token.split('.')[1]; //acá estan los datos del usuario
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const userID = values.jti;
    return userID;
  }

  public logOut(): void {
    window.localStorage.clear();
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
