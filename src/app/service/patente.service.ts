import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelPatente } from '../models/modelPatente';
import { nuevaPatente } from '../models/nueva-patente';


@Injectable({
  providedIn: 'root'
})
export class PatenteService {
  url = "http://localhost:8080/patente";
  nuevaPatente!: nuevaPatente;
  constructor(private http: HttpClient) {}
 
  ngOnInit(){ }
  
  getAll():Observable<modelPatente>{
    return this.http.get<modelPatente>(this.url);
  }

  create(patente: string, usuario: string):Observable<any>{
    this.nuevaPatente = new nuevaPatente(patente,usuario);
    return this.http.post<any>(this.url+'/guardar',this.nuevaPatente);
  }

  get(id: number):Observable<modelPatente>{
    return this.http.get<modelPatente>(this.url+'/'+id); 
  }
  

  update(patente: modelPatente): Observable<modelPatente>{
    return this.http.put<modelPatente>(this.url,patente);
  }
}
