import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    this.refreshSession();
  } 
  public refreshSession(){
    console.log("username",this.tokenService.getUsername());
    let username = this.tokenService.getUsername()!;
    this.tokenService.setUsername(username);
  }

 
}
