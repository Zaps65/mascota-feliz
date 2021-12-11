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
  Propietario,
  SolicitudAfiliacion,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioSolicitudAfiliacionController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/solicitud-afiliaciones', {
    responses: {
      '200': {
        description: 'Array of Propietario has many SolicitudAfiliacion',
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
    return this.propietarioRepository.solicitudAfiliacions(id).find(filter);
  }

  @post('/propietarios/{id}/solicitud-afiliaciones', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAfiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {
            title: 'NewSolicitudAfiliacionInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) solicitudAfiliacion: Omit<SolicitudAfiliacion, 'id'>,
  ): Promise<SolicitudAfiliacion> {
    return this.propietarioRepository.solicitudAfiliacions(id).create(solicitudAfiliacion);
  }

  @patch('/propietarios/{id}/solicitud-afiliaciones', {
    responses: {
      '200': {
        description: 'Propietario.SolicitudAfiliacion PATCH success count',
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
    return this.propietarioRepository.solicitudAfiliacions(id).patch(solicitudAfiliacion, where);
  }

  @del('/propietarios/{id}/solicitud-afiliaciones', {
    responses: {
      '200': {
        description: 'Propietario.SolicitudAfiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.propietarioRepository.solicitudAfiliacions(id).delete(where);
  }
}
