import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves'
import {Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionPropietarioService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
    ) {}

  /*
   * Add service methods here
   */

  identificarPropietario(usuario: string, clave: string){
    try{
      let p = this.propietarioRepository.findOne({where: {correo: usuario, clave:clave}});
      if(p){
        return p;
      }
      return false;

    }catch(error){
      console.log(error);
    }
  }

  generarTokenJWT(propietario: Propietario){
    let token = jwt.sign({
      data:{
        id: propietario.id,
        nombre: `${propietario.nombre} ${propietario.apellido}`,
        correo: propietario.correo,
        rol: 'user',
      }
    }, Llaves.clavePropietario);
    return token;
  }

  validarTokenJWT(token: string){
    try{
      let data = jwt.verify(token, Llaves.clavePropietario);
      return data;
    }catch(error){
      console.log(error);
    }
  }
}
