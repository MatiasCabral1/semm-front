import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patent } from '../models/Patent';
import { NewPatentDTO } from '../models/DTONewPatent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatentService {
  patentURL = environment.PatentURL;
  newPatentDTO!: NewPatentDTO;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getAll(): Observable<Patent> {
    return this.http.get<Patent>(this.patentURL);
  }

  create(patent: Patent): Observable<any> {
    return this.http.post<any>(this.patentURL + '/save', patent);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.patentURL + '/' + id);
  }

  get(id: number): Observable<Patent> {
    return this.http.get<Patent>(this.patentURL + '/' + id);
  }

  update(patent: Patent): Observable<Patent> {
    console.log('contenido de patente en service: ', patent);
    return this.http.put<Patent>(this.patentURL + '/' + patent.id, patent);
  }
}
