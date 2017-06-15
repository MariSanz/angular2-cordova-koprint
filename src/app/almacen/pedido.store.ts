
import { Injectable } from "@angular/core";

@Injectable()
export class PedidoStore {

    private _imagenes: string [];
    private _fechaEntrega: Date;
    private _nombre: string;
    private _tienda: string;

    public constructor() {}

    public set imagenes(imagenes: string []) {
        this._imagenes = imagenes;
    }

    public set fechaEntrega(fecha: Date) {
        this._fechaEntrega = fecha;
    }

    public set nombre(nombre: string) {
        this._nombre = nombre;
    }

    public set tienda(tienda: string) {
        this._tienda = tienda;
    }

    public enviar(): void {

    }

}