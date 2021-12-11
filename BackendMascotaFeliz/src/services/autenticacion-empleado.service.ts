import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves'
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionEmpleadoService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) {}

  /*
   * Add service methods here
   */

  identificarEmpleado(usuario: string, clave: string){
    try{
      let a = this.empleadoRepository.findOne({where: {correo: usuario, clave:clave}});
      if(a){
        return a;
      }
      return false;
        } catch(error){
      console.log(error);
    }
  }

  generarTokenJWT(empleado: Empleado){
    let token = jwt.sign({
      data: {
        id: empleado.id,
        nombre: `${empleado.nombre} ${empleado.apellido}`,
        correo: empleado.correo,
        rol:'empleado',
      }
    }, Llaves.claveEmpleado);
    return token;
  }

  validarTokenJWT(token: string){
    try{
      let data = jwt.verify(token, Llaves.claveEmpleado);
      return data;
    }catch(error){
      console.log(error);
    }
  }
}
