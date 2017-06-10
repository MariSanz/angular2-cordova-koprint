import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParametrosStore } from "app/almacen/parametros.store";

declare var componentHandler: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showLogin = false;
  
  public constructor(
    private router: Router,
    private parametrosStore: ParametrosStore,
    private ngZone: NgZone
  ){
    document.addEventListener('deviceready', this.dispositivoIniciado.bind(this), false);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    componentHandler.upgradeDom();
  }

  private dispositivoIniciado(): void {
    this.parametrosStore.get('accessToken')
      .then(accessToken => {
        if (accessToken == null) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/home']);
        }
      })
      .catch(err => console.error(err));

  }
}
