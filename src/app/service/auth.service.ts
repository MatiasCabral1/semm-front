import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/LoginUser';
import { NewUser } from '../models/newUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/'
  constructor(private httpClient: HttpClient) { }

  public save(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }

  public login(loginUsuario: LoginUser): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }
}
