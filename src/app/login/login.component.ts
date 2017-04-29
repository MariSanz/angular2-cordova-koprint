import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User} from '../user';
import { UsersService } from '../users.service';
import { ParametrosStore } from "app/almacen/parametros.store";


declare var window:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User; 

  constructor(
    private usersService: UsersService,
    private parametrosStore: ParametrosStore,
    private router:Router
  ) { 
    this.user = new User();
  }

  public login(): void {
    this.usersService.login(this.user)
      .then(result => {
        if (result.status == 200) {
          var valor = result.json();
          var accessToken = valor.access_token;
          return this.parametrosStore.set('accessToken', accessToken);
        }
        else {
          throw new Error('Servicio retorno estado de error: ' + result.status);
        }
      })
      .then(() => {
        console.log('Inserto token en BD');
        this.router.navigateByUrl('home');
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
  }

}
