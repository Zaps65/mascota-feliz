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
  Mascota,
  HistorialVisitaDomiciliaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaHistorialVisitaDomiciliariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many HistorialVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistorialVisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistorialVisitaDomiciliaria>,
  ): Promise<HistorialVisitaDomiciliaria[]> {
    return this.mascotaRepository.historialVisitaDomiciliarias(id).find(filter);
  }

  @post('/mascotas/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistorialVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {
            title: 'NewHistorialVisitaDomiciliariaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) historialVisitaDomiciliaria: Omit<HistorialVisitaDomiciliaria, 'id'>,
  ): Promise<HistorialVisitaDomiciliaria> {
    return this.mascotaRepository.historialVisitaDomiciliarias(id).create(historialVisitaDomiciliaria);
  }

  @patch('/mascotas/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.HistorialVisitaDomiciliaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    historialVisitaDomiciliaria: Partial<HistorialVisitaDomiciliaria>,
    @param.query.object('where', getWhereSchemaFor(HistorialVisitaDomiciliaria)) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.historialVisitaDomiciliarias(id).patch(historialVisitaDomiciliaria, where);
  }

  @del('/mascotas/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.HistorialVisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistorialVisitaDomiciliaria)) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.historialVisitaDomiciliarias(id).delete(where);
  }
}
