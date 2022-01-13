import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feriado } from '../models/Feriado';

@Injectable({
  providedIn: 'root'
})
export class DiasNoHabilesService {

  url = "http://localhost:8080/feriado";
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll():Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

  public save(feriado: Feriado): Observable<any>{
    return this.httpClient.post<any>(this.url + '/nuevo', feriado);
  }

  public getByFecha(fecha:String):Observable<any>{
    return this.httpClient.get<any>(this.url+'/'+fecha);
  }

  public saveList(list: any): Observable<any>{
    return this.httpClient.post<any>(this.url + '/saveList', list);
  }
}
