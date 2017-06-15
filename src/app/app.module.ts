import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {UsersService} from './users.service';
import { HomeComponent } from './home/home.component';
import { GalleryPhotosComponent } from './gallery-photos/gallery-photos.component';
import { ParametrosStore } from "app/almacen/parametros.store";
import { HeaderComponent } from './header/header.component';
import { PedidoStore } from "app/almacen/pedido.store";
import { FormOrderComponent } from "app/form-order/form-order.component";
import { AcercadeComponent } from './acercade/acercade.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'gallery', component: GalleryPhotosComponent },
  { path: 'form-order', component: FormOrderComponent },
  { path: 'acercaDe', component: AcercadeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryPhotosComponent,
    HeaderComponent,
    FormOrderComponent,
    AcercadeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UsersService,
    ParametrosStore,
    PedidoStore
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ]
})
export class AppModule { }
