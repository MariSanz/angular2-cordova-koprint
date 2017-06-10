import { Component, OnInit, NgZone } from '@angular/core';

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
      private ngZone: NgZone
  ) {
  }

  ngOnInit() {

    cordova.plugins.ThumbnailGenerator.generate((uris) => {
        //zone: para respuestas con retraso, para que angular actualice la interfaz, angular inspecciona que cambias los atributos
        this.ngZone.run(() => {
            this.imagenes = uris.map(uri => new Imagen(uri));
        });
    });

    //this.readFromFile();
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
            console.log(dataURLs);
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

/*
  public readFromFile() {
    // var pathToFile = cordova.file.dataDirectory + fileName;
    var errorHandler = function (e) {  
        var msg = '';
        debugger;
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'Storage quota exceeded';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'File not found';
                break;
            case FileError.SECURITY_ERR:
                msg = 'Security error';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'Invalid modification';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'Invalid state';
                break;
            default:
                msg = 'Unknown error';
                break;
        };

        console.log('Error: ' + msg);
    }



    window.plugins.contentproviderplugin.query({
		contentUri: "content://media/external/images/media",
		projection: ["_data"],
		selection: null,
		selectionArgs: null,
		sortOrder: null
	}, (datos:any[]) => {
        this.ngZone.run(() => {
            this.urisImagenes.length = 0;
            datos.forEach(dato => {
                this.urisImagenes.push(dato._data);
            });
        });
	}, function (err) {
		console.log("error query");
	});

/*
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + '/DCIM/Camera', (dirEntry) => {
        var directoryReader = dirEntry.createReader();
        directoryReader.readEntries(files => {
            files.forEach(file => {
                console.log(file);
                this.urisImagenes.push(file.toURL());
            });          
        }, errorHandler.bind(null));
    }, errorHandler.bind(null));
*/
        
//  }


}
