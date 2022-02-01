import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patent } from '../models/Patent';
import { NewPatentDTO } from '../models/DTONewPatent';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class PatentService {
  url = "http://localhost:8080/patent";
  newPatentDTO!: NewPatentDTO;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) {}
 
  ngOnInit(){ }
  
  getAll():Observable<Patent>{
    return this.http.get<Patent>(this.url);
  }

  create(patent: Patent):Observable<any>{
    return this.http.post<any>(this.url+'/save',patent);
  }

    delete(id: number):Observable<any>{
    return this.http.delete<any>(this.url+'/'+id);
  }

  get(id: number):Observable<Patent>{
    return this.http.get<Patent>(this.url+'/'+id); 
  }
  

  update(patent: Patent): Observable<Patent>{
    console.log("contenido de patente en service: ", patent);
    return this.http.put<Patent>(this.url + '/' + patent.id, patent);
  }
}
