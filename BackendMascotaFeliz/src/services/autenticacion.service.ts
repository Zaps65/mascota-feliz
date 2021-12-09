import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Propietario} from '../models';
import {AsesorRepository, EmpleadoRepository, PropietarioRepository} from '../repositories';
import {Llaves} from '../config/llaves'
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) {}

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

  identificarAsesor(usuario: string, clave: string){
    try{
      let p = this.asesorRepository.findOne({where: {correo: usuario, clave:clave}});
      if(p){
        return p;
      }
      return false;

    }catch(error){
      console.log(error);
    }
  }

  identificarAuxiliar(usuario: string, clave: string){
    try{
      let p = this.empleadoRepository.findOne({where: {correo: usuario, clave:clave}});
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
      }
    }, Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string){
    try{
      let data = jwt.verify(token, Llaves.claveJWT);
      return data;
    }catch(error){
      console.log(error);
    }
  }
}
