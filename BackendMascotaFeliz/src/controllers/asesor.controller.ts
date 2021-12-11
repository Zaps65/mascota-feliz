import {authenticate} from '@loopback/authentication';
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
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import {AutenticacionAsesorService, ContrasennaService, NotificacionService} from '../services';

@authenticate('admin')
export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @service(AutenticacionAsesorService)
    private autenticacionAsesorService: AutenticacionAsesorService,
    @service(ContrasennaService)
    private contrasennaService: ContrasennaService,
    @service(NotificacionService)
    public notificacionService: NotificacionService,
  ) {}

  @post('/login/asesor', {
    responses: {
      '200': {
        description: 'Identificación de asesor',
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.autenticacionAsesorService.identificarAsesor(credenciales.username, credenciales.clave);
    if (p) {
      let token = this.autenticacionAsesorService.generarTokenJWT(p);
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

  @post('/asesor')
  @response(200, {
    description: 'El asesor se ha creado correctamente',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    let clave = this.contrasennaService.generarClave();
    let claveCifrada = this.contrasennaService.cifrarClave(clave);
    asesor.clave = claveCifrada;
    let p = await this.asesorRepository.create(asesor);

    // Notificación

    this.notificacionService.notificarRegistro(asesor, clave)
    return p;
  }


  @get('/asesor/count')
  @response(200, {
    description: 'Cantidad de asesores que se encuentran registrados.',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesor')
  @response(200, {
    description: 'Asesores que se encuentran registrados.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesor')
  @response(200, {
    description: 'Se ha actualizado la lista de asesores correctamente.',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesor/{id}')
  @response(200, {
    description: 'Información del asesor.',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesor/{id}')
  @response(204, {
    description: 'Se ha actualizado el asesor correctamente.',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesor/{id}')
  @response(204, {
    description: 'Se ha actualizado el asesor correctamente.',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesor/{id}')
  @response(204, {
    description: 'Se ha eliminado el asesor correctamente.',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
