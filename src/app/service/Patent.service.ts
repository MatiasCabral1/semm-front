import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patent } from '../models/Patent';
import { NewPatentDTO } from '../models/DTONewPatent';


@Injectable({
  providedIn: 'root'
})
export class PatentService {
  url = "http://localhost:8080/patent";
  newPatentDTO!: NewPatentDTO;
  constructor(private http: HttpClient) {}
 
  ngOnInit(){ }
  
  getAll():Observable<Patent>{
    return this.http.get<Patent>(this.url);
  }

  create(patent: string, username: string):Observable<any>{
    this.newPatentDTO = new NewPatentDTO(patent,username);
    return this.http.post<any>(this.url+'/save',this.newPatentDTO);
  }

  delete(patent: string, usuario: string):Observable<any>{
    this.newPatentDTO = new NewPatentDTO(patent,usuario);
    return this.http.post<any>(this.url+'/delete',this.newPatentDTO);
  }

  get(id: number):Observable<Patent>{
    return this.http.get<Patent>(this.url+'/'+id); 
  }
  

  update(patent: Patent): Observable<Patent>{
    return this.http.put<Patent>(this.url,patent);
  }
}
