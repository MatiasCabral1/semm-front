import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from '../models/History';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  url = "http://localhost:8080/history";

  constructor(
    private httlClient: HttpClient
  ) { }

  getAll():Observable<any>{
    return this.httlClient.get<any>(this.url);
  }

  create(history: History):Observable<any>{
    return this.httlClient.post<any>(this.url,history);
  }

  getByCc(id: number):Observable<any>{
    return this.httlClient.get<any>(this.url+'/'+id); 
  }
  

}
