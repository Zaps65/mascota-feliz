import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/llaves';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  notificarRegistro(usuario: any, clave: string) {
    console.log('Notificando registro de usuario: ' + usuario.id);
    let to = usuario.correo;
    let subject = 'Registro de usuario';
    let body = `Hola ${usuario.nombre} ${usuario.apellido}, bienvenido a Mascota Feliz. Su nombre de usuario es: ${usuario.correo} Su clave es: ${clave} Gracias por registrarse.`;
    fetch(`${Llaves.urlServiciosNotificaciones}/send_email/?to=${to}&subject=${subject}&body=${body}`)
      .then((data: any) => {
        console.log(data);
      });
  }
}
