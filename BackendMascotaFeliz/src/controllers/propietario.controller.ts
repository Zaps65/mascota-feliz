import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class PropietarioController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository : PropietarioRepository,
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Identificación de usuario',
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.autenticacionService.identificarPersona(credenciales.username, credenciales.clave);
    if (p) {
      let token = this.autenticacionService.generarTokenJWT(p);
      return {
        datos:{
          nombre: p.nombre,
          apellido: p.apellido,
          correo: p.correo,
          id: p.id
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401](`Usuario o clave incorrectos`);
    }
  }

  @post('/propietario')
  @response(200, {
    description: 'Propietario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Propietario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietario',
            exclude: ['id'],
          }),
        },
      },
    })
    propietario: Omit<Propietario, 'id'>,
  ): Promise<Propietario> {
      let clave = this.autenticacionService.generarClave();
      let claveCifrada = this.autenticacionService.cifrarClave(clave);
      propietario.clave = claveCifrada;
      let p = await this.propietarioRepository.create(propietario);

      // Notification
      let to = propietario.correo;
      let subject = 'Registro de usuario';
let body = `Hola ${propietario.nombre} ${propietario.apellido}, bienvenido a Mascota Feliz. Su nombre de usuario es: ${propietario.correo} Su clave es: ${clave} Gracias por registrarse.`;
      fetch(`${Llaves.urlServiciosNotificaciones}/send_email/?to=${to}&subject=${subject}&body=${body}`)
        .then((data: any) => {
          console.log(data);
        });

      return p;return propietario;
  }

  @get('/propietario/count')
  @response(200, {
    description: 'Propietario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.count(where);
  }

  @get('/propietario')
  @response(200, {
    description: 'Array of Propietario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propietario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Propietario) filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.propietarioRepository.find(filter);
  }

  @patch('/propietario')
  @response(200, {
    description: 'Propietario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.updateAll(propietario, where);
  }

  @get('/propietario/{id}')
  @response(200, {
    description: 'Propietario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Propietario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Propietario, {exclude: 'where'}) filter?: FilterExcludingWhere<Propietario>
  ): Promise<Propietario> {
    return this.propietarioRepository.findById(id, filter);
  }

  @patch('/propietario/{id}')
  @response(204, {
    description: 'Propietario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.updateById(id, propietario);
  }

  @put('/propietario/{id}')
  @response(204, {
    description: 'Propietario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.replaceById(id, propietario);
  }

  @del('/propietario/{id}')
  @response(204, {
    description: 'Propietario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propietarioRepository.deleteById(id);
  }
}
