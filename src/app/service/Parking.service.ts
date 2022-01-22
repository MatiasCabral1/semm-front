import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../models/Estacionamiento';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  URL = 'http://localhost:8080/parking';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ){ }

  public save(parking: Parking): Observable<any>{
    return this.httpClient.post<any>(this.URL + '/save', parking);
  }

  public endParking(): Observable<any>{
    return this.httpClient.get<any>(this.URL + '/endParking/'+this.tokenService.getUsername());
  }

  public getTime():Observable<any>{
    return this.httpClient.get<any>(this.URL + '/getTime/'+this.tokenService.getUsername());
  }

  public getParkingStartedByUser():Observable<any>{
    return this.httpClient.get<any>(this.URL + '/getParkingStartedByUser/'+this.tokenService.getUsername());
  }

}