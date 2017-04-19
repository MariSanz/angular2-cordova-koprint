import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User} from '../user';
import { UsersService } from '../users.service';


declare var window:any;

function execSql(tr: any, sql: string, parametros: any[] = []): Promise<any> {
  return new Promise((resolv, reject) => {

    function error(err) {
      console.error('Error al ejecutar "' + sql + "' con paramtros [" + parametros.join(',') + "]");
      reject(err);
    }  

    tr.executeSql(sql, parametros, resolv, error);
  });
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User; 

  constructor(
    private usersService: UsersService, private router:Router
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
          db.transaction(tr => {
            var s1 = execSql(tr,
              'CREATE TABLE IF NOT EXISTS parametros (' + 
              'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
              'nombre VARCHAR(50),' +
              'valor VARCHAR(250) )'
            );
            var s2 = execSql(tr,
              'INSERT INTO parametros (nombre, valor) VALUES (?,?)',
              ['accessToken', accessToken]
            );

            Promise.all([s1,s2])
              .then(() => {
                console.log('Inserto token en BD');
                this.router.navigateByUrl('home');
              })
              .catch(err => {
                console.error(err);
              });
          });
        }
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
  }

}
