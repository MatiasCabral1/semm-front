import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../models/Historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {
  url = "http://localhost:8080/historial";

  constructor(
    private httlClient: HttpClient
  ) { }

  getAll():Observable<any>{
    return this.httlClient.get<any>(this.url);
  }

  create(historial: Historial):Observable<any>{
    return this.httlClient.post<any>(this.url,historial);
  }

  getByCc(id: number):Observable<any>{
    return this.httlClient.get<any>(this.url+'/'+id); 
  }
  

}
