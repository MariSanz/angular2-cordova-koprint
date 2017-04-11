import { Component, OnInit } from '@angular/core';

import { User} from '../user';
import { UsersService } from '../users.service';

declare var window:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User; 

  constructor(
    private usersService: UsersService
  ) { 

    this.user = new User();
  }

  public login(): void {
    this.usersService.login(this.user)
      .then(result => {
        if (result.status == 200) {
          var valor = result.json();
          var accessToken = valor.access_token;
          var db = window.sqlitePlugin.openDatabase({name: 'koprint.db', location: 'default'});
          db.transaction(function(tr) {
            tr.executeSql(
              'INSERT INTO parametros (nombre, valor) VALUES (?,?)',
              ['accessToken', accessToken],
              function () {
                console.log('Inserto token en BD');
              },
              function () {
                console.log('Error al insertar token en BD');
              }
            );
          });
        }
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
  }

}
