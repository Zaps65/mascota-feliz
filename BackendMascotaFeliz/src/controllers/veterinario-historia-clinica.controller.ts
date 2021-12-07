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
  Veterinario,
  HistoriaClinica,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioHistoriaClinicaController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Array of Veterinario has many HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.veterinarioRepository.historiaClinicas(id).find(filter);
  }

  @post('/veterinarios/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinicaInVeterinario',
            exclude: ['id'],
            optional: ['veterinarioId']
          }),
        },
      },
    }) historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.veterinarioRepository.historiaClinicas(id).create(historiaClinica);
  }

  @patch('/veterinarios/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Veterinario.HistoriaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: Partial<HistoriaClinica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.veterinarioRepository.historiaClinicas(id).patch(historiaClinica, where);
  }

  @del('/veterinarios/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Veterinario.HistoriaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.veterinarioRepository.historiaClinicas(id).delete(where);
  }
}
