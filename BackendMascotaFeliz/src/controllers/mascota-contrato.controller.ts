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
  Contrato,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaContratoController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/contrato', {
    responses: {
      '200': {
        description: 'Mascota has one Contrato',
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
    return this.mascotaRepository.contrato(id).get(filter);
  }

  @post('/mascotas/{id}/contrato', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contrato)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {
            title: 'NewContratoInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) contrato: Omit<Contrato, 'id'>,
  ): Promise<Contrato> {
    return this.mascotaRepository.contrato(id).create(contrato);
  }

  @patch('/mascotas/{id}/contrato', {
    responses: {
      '200': {
        description: 'Mascota.Contrato PATCH success count',
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
    return this.mascotaRepository.contrato(id).patch(contrato, where);
  }

  @del('/mascotas/{id}/contrato', {
    responses: {
      '200': {
        description: 'Mascota.Contrato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.mascotaRepository.contrato(id).delete(where);
  }
}
