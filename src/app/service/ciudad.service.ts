import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/Ciudad';
@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  url = "http://localhost:8080/ciudad";

  contenido !: []
  datos!: Ciudad;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll():Observable<Ciudad>{
    return this.httpClient.get<Ciudad>(this.url);
  }
}
