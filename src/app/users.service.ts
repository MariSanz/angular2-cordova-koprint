import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';

import { User } from './user';
import { Settings } from '../settings';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  constructor(
    private http: Http
  ) { }

  public register(user: User): Promise<any> {
    return this.http.post(Settings.WS_URL + 'users', user)
      .toPromise();
  }

  public findAllUsers(): Promise<any> {

    var options: RequestOptions = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer 96ad7aae0b1a531d04eb806ecb2adb2d3a83de3f'
      })
    });

    return this.http.get(Settings.WS_URL + 'users', options)
      .toPromise();
  }

  public login(user: User): Promise<any> {

    var options: RequestOptions = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Basic Q2xpZW50ZS1Db3Jkb3ZhOkNsaWVudGUtQ29yZG92YQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    return this.http.post('http://localhost:3000/oauth/token',
      'grant_type=password&username=' + user.email + '&password=' + user.clave,
      options)
      .toPromise();
  }
}
