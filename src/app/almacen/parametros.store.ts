
import { Injectable } from "@angular/core";

declare var window:any;

function execSql(tr: any, sql: string, parametros: any[] = []): Promise<any> {
  return new Promise((resolv, reject) => {

    function error(err) {
      console.error('Error al ejecutar "' + sql + "' con paramtros [" + parametros.join(',') + "]");
      reject(err);
    }  

    tr.executeSql(sql, parametros,
        (tx, result) => {
            if (result) resolv(result);
            else resolv(tx);
        },
        error);
  });
}

@Injectable()
export class ParametrosStore {

    public constructor(){}

    public inicializarBD(tr: any): Promise<any> {

        var s1 = execSql(tr,
            'CREATE TABLE IF NOT EXISTS parametros (' + 
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nombre VARCHAR(50),' +
            'valor VARCHAR(250), ' +
            'UNIQUE(nombre) )'
        );
        var s2 = execSql(tr,
            'INSERT OR IGNORE INTO parametros (nombre, valor) VALUES (?,?)',
            ['accessToken', null]
        );

        return Promise.all([s1,s2]);        
    }

    public set(nombre: string, valor: string): Promise<any> {
        return new Promise((resolv, reject) => {
            var db = window.sqlitePlugin.openDatabase({name: 'koprint.db', location: 'default'});
            db.transaction(tr => {

                var s1 = this.inicializarBD(tr);
                var s2 = execSql(tr,
                  'UPDATE parametros SET valor = ? WHERE nombre = ?',
                  [valor, nombre]
                );

                Promise.all([s1,s2])
                    .then(resolv)
                    .catch(reject);
            });

        });
    }

    public get(nombre: string): Promise<string> {
        return new Promise((resolv, reject) => {
            debugger;
            var db = window.sqlitePlugin.openDatabase({name: 'koprint.db', location: 'default'});
            db.transaction(tr => {
                debugger;
                var s1 = this.inicializarBD(tr);
                var s2 = execSql(tr,
                  'SELECT valor FROM parametros WHERE nombre = ?',
                  [nombre]
                );

                Promise.all([s1,s2])
                    .then(r => {
                        let resultado = r[1];
                        if (resultado.rows.length != 1) {
                            throw new Error('Se esperaba 1 elemento (' + resultado.rows.length + ' obtenidos)');
                        }
                        resolv(resultado.rows.item(0).valor)
                    })
                    .catch(reject);
            });
        });
    }

}