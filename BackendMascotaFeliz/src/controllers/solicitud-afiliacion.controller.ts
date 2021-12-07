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
} from '@loopback/rest';
import {SolicitudAfiliacion} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionController {
  constructor(
    @repository(SolicitudAfiliacionRepository)
    public solicitudAfiliacionRepository : SolicitudAfiliacionRepository,
  ) {}

  @post('/solicitud-afiliacion')
  @response(200, {
    description: 'SolicitudAfiliacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudAfiliacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {
            title: 'NewSolicitudAfiliacion',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudAfiliacion: Omit<SolicitudAfiliacion, 'id'>,
  ): Promise<SolicitudAfiliacion> {
    return this.solicitudAfiliacionRepository.create(solicitudAfiliacion);
  }

  @get('/solicitud-afiliacion/count')
  @response(200, {
    description: 'SolicitudAfiliacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudAfiliacion) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.solicitudAfiliacionRepository.count(where);
  }

  @get('/solicitud-afiliacion')
  @response(200, {
    description: 'Array of SolicitudAfiliacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudAfiliacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudAfiliacion) filter?: Filter<SolicitudAfiliacion>,
  ): Promise<SolicitudAfiliacion[]> {
    return this.solicitudAfiliacionRepository.find(filter);
  }

  @patch('/solicitud-afiliacion')
  @response(200, {
    description: 'SolicitudAfiliacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {partial: true}),
        },
      },
    })
    solicitudAfiliacion: SolicitudAfiliacion,
    @param.where(SolicitudAfiliacion) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.solicitudAfiliacionRepository.updateAll(solicitudAfiliacion, where);
  }

  @get('/solicitud-afiliacion/{id}')
  @response(200, {
    description: 'SolicitudAfiliacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudAfiliacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudAfiliacion, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudAfiliacion>
  ): Promise<SolicitudAfiliacion> {
    return this.solicitudAfiliacionRepository.findById(id, filter);
  }

  @patch('/solicitud-afiliacion/{id}')
  @response(204, {
    description: 'SolicitudAfiliacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {partial: true}),
        },
      },
    })
    solicitudAfiliacion: SolicitudAfiliacion,
  ): Promise<void> {
    await this.solicitudAfiliacionRepository.updateById(id, solicitudAfiliacion);
  }

  @put('/solicitud-afiliacion/{id}')
  @response(204, {
    description: 'SolicitudAfiliacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudAfiliacion: SolicitudAfiliacion,
  ): Promise<void> {
    await this.solicitudAfiliacionRepository.replaceById(id, solicitudAfiliacion);
  }

  @del('/solicitud-afiliacion/{id}')
  @response(204, {
    description: 'SolicitudAfiliacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudAfiliacionRepository.deleteById(id);
  }
}
