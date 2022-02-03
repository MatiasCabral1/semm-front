import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from '../models/History';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historyURL = environment.historyURL;

  constructor(private httlClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httlClient.get<any>(this.historyURL);
  }

  create(history: History): Observable<any> {
    return this.httlClient.post<any>(this.historyURL, history);
  }

  getByCc(id: number): Observable<any> {
    return this.httlClient.get<any>(this.historyURL + '/' + id);
  }
}
