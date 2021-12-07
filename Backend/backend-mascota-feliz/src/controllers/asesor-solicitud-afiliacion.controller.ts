import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asesor,
  SolicitudAfiliacion,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorSolicitudAfiliacionController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Array of Asesor has many SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAfiliacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudAfiliacion>,
  ): Promise<SolicitudAfiliacion[]> {
    return this.asesorRepository.solicitudAfiliacions(id).find(filter);
  }

  @post('/asesors/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAfiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {
            title: 'NewSolicitudAfiliacionInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) solicitudAfiliacion: Omit<SolicitudAfiliacion, 'id'>,
  ): Promise<SolicitudAfiliacion> {
    return this.asesorRepository.solicitudAfiliacions(id).create(solicitudAfiliacion);
  }

  @patch('/asesors/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Asesor.SolicitudAfiliacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {partial: true}),
        },
      },
    })
    solicitudAfiliacion: Partial<SolicitudAfiliacion>,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.asesorRepository.solicitudAfiliacions(id).patch(solicitudAfiliacion, where);
  }

  @del('/asesors/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Asesor.SolicitudAfiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.asesorRepository.solicitudAfiliacions(id).delete(where);
  }
}
