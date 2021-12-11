import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Asesor} from '../models';
import {AsesorRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionAsesorService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) {}

  /*
   * Add service methods here
   */

  identificarAsesor(usuario: string, clave: string){
    try{
      let a = this.asesorRepository.findOne({where: {correo: usuario, clave:clave}});
      if(a){
        return a;
      }
      return false;
        } catch(error){
      console.log(error);
    }
  }

  generarTokenJWT(asesor: Asesor){
    let token = jwt.sign({
      data: {
        id: asesor.id,
        nombre: `${asesor.nombre} ${asesor.apellido}`,
        correo: asesor.correo,
        rol: 'asesor',
      }
    }, Llaves.claveAsesor);
    return token;
  }

  validarTokenJWT(token: string){
    try{
      let data = jwt.verify(token, Llaves.claveAsesor);
      return data;
    }catch(error){
      console.log(error);
    }
  }
}
