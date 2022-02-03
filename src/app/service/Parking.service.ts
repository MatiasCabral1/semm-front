import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../models/Estacionamiento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  parkingURL = environment.parkingURL;

  constructor(private httpClient: HttpClient) {}

  public save(parking: Parking): Observable<any> {
    return this.httpClient.post<any>(this.parkingURL + '/save', parking);
  }

  public endParking(id: number): Observable<any> {
    return this.httpClient.get<any>(this.parkingURL + '/endParking/' + id);
  }

  public getTime(id: number): Observable<any> {
    return this.httpClient.get<any>(this.parkingURL + '/getTime/' + id);
  }

  public getParkingStartedByUser(id: number): Observable<any> {
    return this.httpClient.get<any>(
      this.parkingURL + '/getParkingStartedByUser/' + id
    );
  }
}
