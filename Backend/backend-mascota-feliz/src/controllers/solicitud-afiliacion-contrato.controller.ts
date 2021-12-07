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
  SolicitudAfiliacion,
  Contrato,
} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionContratoController {
  constructor(
    @repository(SolicitudAfiliacionRepository) protected solicitudAfiliacionRepository: SolicitudAfiliacionRepository,
  ) { }

  @get('/solicitud-afiliacions/{id}/contrato', {
    responses: {
      '200': {
        description: 'SolicitudAfiliacion has one Contrato',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contrato),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contrato>,
  ): Promise<Contrato> {
    return this.solicitudAfiliacionRepository.contrato(id).get(filter);
  }

  @post('/solicitud-afiliacions/{id}/contrato', {
    responses: {
      '200': {
        description: 'SolicitudAfiliacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contrato)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudAfiliacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {
            title: 'NewContratoInSolicitudAfiliacion',
            exclude: ['id'],
            optional: ['solicitudAfiliacionId']
          }),
        },
      },
    }) contrato: Omit<Contrato, 'id'>,
  ): Promise<Contrato> {
    return this.solicitudAfiliacionRepository.contrato(id).create(contrato);
  }

  @patch('/solicitud-afiliacions/{id}/contrato', {
    responses: {
      '200': {
        description: 'SolicitudAfiliacion.Contrato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {partial: true}),
        },
      },
    })
    contrato: Partial<Contrato>,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.solicitudAfiliacionRepository.contrato(id).patch(contrato, where);
  }

  @del('/solicitud-afiliacions/{id}/contrato', {
    responses: {
      '200': {
        description: 'SolicitudAfiliacion.Contrato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.solicitudAfiliacionRepository.contrato(id).delete(where);
  }
}
