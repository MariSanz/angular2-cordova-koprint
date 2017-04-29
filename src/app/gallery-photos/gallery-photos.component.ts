import { Component, OnInit, NgZone } from '@angular/core';

declare var cordova:any;
declare var window:any;
declare var FileError:any;

@Component({
  selector: 'app-gallery-photos',
  templateUrl: './gallery-photos.component.html',
  styleUrls: ['./gallery-photos.component.css']
})
export class GalleryPhotosComponent implements OnInit {

  private urisImagenes: string[] = [];

  constructor(
      private ngZone: NgZone
  ) {
  }

  ngOnInit() {
      this.readFromFile();
  }

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
        
  }


}
