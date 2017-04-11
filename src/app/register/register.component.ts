import { Component, OnInit } from '@angular/core';

import {User} from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User; 

  constructor(
    private usersService: UsersService
  ) {
    this.user = new User();
   }

  ngOnInit() {
  }

  private register() {
    this.usersService.register(this.user);
  }

}
