import { Component, OnInit, NgZone } from '@angular/core';
import { PedidoStore } from "app/almacen/pedido.store";
import { Router } from '@angular/router';

declare var cordova:any;
declare var window:any;
declare var FileError:any;

class Imagen {
    private _seleccionada: boolean;
    private _uri: string;

    public constructor(uri:string) {
        this._uri = uri;
        this._seleccionada = false;
    }

    public get seleccionada(): boolean {
        return this._seleccionada;
    }

    public set seleccionada(valor: boolean) {
        this._seleccionada = valor;
    }

    public get uri() {
        return this._uri;
    }
}

@Component({
  selector: 'app-gallery-photos',
  templateUrl: './gallery-photos.component.html',
  styleUrls: ['./gallery-photos.component.css']
})
export class GalleryPhotosComponent implements OnInit {

  private imagenes: Imagen[] = [];

  constructor(
      private ngZone: NgZone,
      private pedidoStore: PedidoStore,
      private router:Router
  ) {
  }

  ngOnInit() {

    cordova.plugins.ThumbnailGenerator.generate((uris) => {
        //zone: para respuestas con retraso, para que angular actualice la interfaz, angular inspecciona que cambias los atributos
        this.ngZone.run(() => {
            this.imagenes = uris.map(uri => new Imagen(uri));
        });
    });
  
  }

  public seleccionar(imagen: Imagen): void {
    imagen.seleccionada = !imagen.seleccionada;
  }

  public irAFormularioDatos(): void {
    //Array de promesas, espero a que acaben todas las imagenes de generarse el data url
    debugger;
    var seleccionadas: Promise<string> [] = this.imagenes
        .filter(imagen => imagen.seleccionada)
        .map(seleccionada => this.generarDataURL(seleccionada.uri));

    Promise.all(seleccionadas)
        .then((dataURLs: string[]) => {
            this.pedidoStore.imagenes = dataURLs;
            this.router.navigate(['/form-order']);
        })
        .catch((e) => {
            console.log(e);
        });;
  }

  private generarDataURL(fichero: string): Promise<string> {

    return new Promise((resolv, reject) => {
        var url: string = 'file://' + fichero;
        window.resolveLocalFileSystemURL(url, (entrada: any) => {
            //fileEntry
            entrada.file(fichero => {

                var lector: FileReader = new FileReader();

                lector.onloadend = () => {
                    resolv(lector.result);
                }
                lector.readAsDataURL(fichero);
            });
        });
    });

  }
}
