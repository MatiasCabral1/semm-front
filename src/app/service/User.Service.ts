import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentAccount } from '../models/CurrentAccount';
import { NewUser } from '../models/NewUser';
import { Patent } from '../models/Patent';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.userURL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getPatents(): Observable<Patent> {
    return this.http.get<Patent>(
      this.url + '/patents/' + this.tokenService.getIdUser()
    );
  }

  public chargeBalance(currentAccount: CurrentAccount): Observable<any> {
    return this.http.post<any>(this.url + '/chargeBalance', currentAccount);
  }

  public getCurrentAccount(): Observable<any> {
    return this.http.get<any>(
      this.url + '/getCurrentAccount/' + this.tokenService.getIdUser()
    );
  }

  public getData(): Observable<any> {
    return this.http.get<any>(
      this.url + '/getData/' + this.tokenService.getIdUser()
    );
  }
}
