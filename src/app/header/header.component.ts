import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ParametrosStore } from "app/almacen/parametros.store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private logged: boolean = true;
  @ViewChild('mdlLayout')
  private mdlLayout: any;

  constructor(
    private router: Router,
    private parametrosStore: ParametrosStore
  ) { }

  ngOnInit() {
  }

  public logout(): void {
   
    this.logged = false;
    this.parametrosStore.set('accessToken', null);
    this.router.navigate(['login'], {replaceUrl: true});
    this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
  }

  public irAcercaDe(): void{
    this.router.navigate(['acercaDe']);
    this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
  }

}
