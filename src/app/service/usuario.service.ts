import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaCorriente } from '../models/CuentaCorriente';
import { modelPatente } from '../models/modelPatente';
import { NuevoUsuario } from '../models/nuevo-usuario';
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
    return this.http.post<any>(this.url+'/debitar',this.username);
  }

  public cargarSaldo(cuentaCorriente: CuentaCorriente):Observable<any>{
    console.log("monto enviado",cuentaCorriente.saldo);
    return this.http.post<any>(this.url+'/cargarSaldo',cuentaCorriente);
  }

  public getCuentaCorriente(username: string): Observable<any>{
    return this.http.post<any>(this.url+'/getSaldo',username)
  }

  public getDatos(username:string): Observable<any>{
    return this.http.get<any>(this.url+'/getDatos/'+ username)
  }
}
