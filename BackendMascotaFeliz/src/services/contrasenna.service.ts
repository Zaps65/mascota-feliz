import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class ContrasennaService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  generarClave(){
    let clave = generador(12, false);
    return clave;
  }

  cifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
