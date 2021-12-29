import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estacionamiento } from '../models/Estacionamiento';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class estacionamientoService {
  URL = 'http://localhost:8080/estacionamiento';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ){ }

  public save(estacionamiento: Estacionamiento): Observable<any>{
    return this.httpClient.post<any>(this.URL + '/nuevo', estacionamiento);
  }

  public finalizarEstacionamiento(): Observable<any>{
    return this.httpClient.post<any>(this.URL + '/finalizarEstacionamiento',this.tokenService.getUserName());
  }

  public getTiempoTranscurrido():Observable<any>{
    return this.httpClient.post<any>(this.URL + '/getTime',this.tokenService.getUserName());
  }

  public getEstado():Observable<any>{
    return this.httpClient.post<any>(this.URL + '/getEstado',this.tokenService.getUserName());
  }

    // persistTime():void{
    //  let today = new Date();
    //   this.seg =  today.getSeconds();
    //   this.min= today.getMinutes();
    //   this.hs = today.getHours();
    //   localStorage.setItem("seg", this.seg);
    //   localStorage.setItem("min", this.min);
    //   localStorage.setItem("hs", this.hs );
    //   localStorage.setItem("iniciado", "true");
    // }

  //   getDatosInicio(){
  //   let est = new Estacionamiento();
  //   est.setSegundos(localStorage.getItem("seg"));
  //   est.setMinutos(localStorage.getItem("min"));
  //   est.setHoras(localStorage.getItem("hs"));
  //   return est;
  // }

    
}