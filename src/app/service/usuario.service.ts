import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelPatente } from '../models/modelPatente';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:8080/persona";
  username : any = this.tokenService.getUserName();


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }


  public getPatentes(): Observable<modelPatente>{
    return this.http.post<modelPatente>(this.url+'/patentes',this.username);
  }

  public debitar():Observable<any>{
    console.log("ejecutando debito");
    return this.http.post<any>(this.url+'/debitar',this.username);
  }

  public getSaldo(): Observable<any>{
    return this.http.post<any>(this.url+'/getSaldo',this.username)
  }
}
