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
  Contrato,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioContratoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Contrato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contrato)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contrato>,
  ): Promise<Contrato[]> {
    return this.propietarioRepository.contratoes(id).find(filter);
  }

  @post('/propietarios/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contrato)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {
            title: 'NewContratoInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) contrato: Omit<Contrato, 'id'>,
  ): Promise<Contrato> {
    return this.propietarioRepository.contratoes(id).create(contrato);
  }

  @patch('/propietarios/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Propietario.Contrato PATCH success count',
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
    return this.propietarioRepository.contratoes(id).patch(contrato, where);
  }

  @del('/propietarios/{id}/contratoes', {
    responses: {
      '200': {
        description: 'Propietario.Contrato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contrato)) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.propietarioRepository.contratoes(id).delete(where);
  }
}
