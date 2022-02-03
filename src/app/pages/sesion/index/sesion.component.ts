import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  name!: string;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refreshSession();
  }
  public refreshSession() {
    this.userService.getData().subscribe((data) => {
      console.log('contenido traido del usuario en nav-var: ', data);
      this.name = data.name;
    });
  }
}
