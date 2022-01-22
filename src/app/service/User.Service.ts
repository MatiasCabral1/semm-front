import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentAccount } from '../models/CurrentAccount';
import { Patent } from '../models/Patent';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:8080/user";
  username : any = this.tokenService.getUsername();


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }


  public getPatents(): Observable<Patent>{
    return this.http.get<Patent>(this.url+'/patents/'+this.username);
  }

  public chargeBalance(currentAccount: CurrentAccount):Observable<any>{
    return this.http.post<any>(this.url+'/chargeBalance',currentAccount);
  }

  public getCurrentAccount(username: string): Observable<any>{
    return this.http.get<any>(this.url+'/getCurrentAccount/'+username)
  }

  public getData(username:string): Observable<any>{
    return this.http.get<any>(this.url+'/getData/'+ username)
  }
}
