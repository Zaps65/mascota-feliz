import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionPropietarioService} from '../services/autentificacion-propietario.service';

export class EstrategiaEmpleado implements AuthenticationStrategy {

  constructor(
    @service(AutenticacionPropietarioService)
    public autenticacionPropietarioService: AutenticacionPropietarioService,
  ) {}

  name: string = 'user';
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let data = this.autenticacionPropietarioService.validarTokenJWT(token);
      if (data && data.data.rol == 'user') {
        let perfil: UserProfile = Object.assign({
          nombre: data.data.nombre,
        });
        return perfil;
      }else{
        throw new HttpErrors[403]('No tiene permisos para acceder a esta sección');
      }
    }else{
      throw new HttpErrors[401]('No se ha incluido un token en la petición.');
    }
  }
}
