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
import {Contrato} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoController {
  constructor(
    @repository(ContratoRepository)
    public contratoRepository : ContratoRepository,
  ) {}

  @post('/contrato')
  @response(200, {
    description: 'Se ha subido el contrato correctamente',
    content: {'application/json': {schema: getModelSchemaRef(Contrato)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {
            title: 'NewContrato',
            exclude: ['id'],
          }),
        },
      },
    })
    contrato: Omit<Contrato, 'id'>,
  ): Promise<Contrato> {
    return this.contratoRepository.create(contrato);
  }

  @get('/contrato/count')
  @response(200, {
    description: 'Contrato model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contrato) where?: Where<Contrato>,
  ): Promise<Count> {
    return this.contratoRepository.count(where);
  }

  @get('/contrato')
  @response(200, {
    description: 'Lista de todos los contratos en la base de datos',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contrato, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contrato) filter?: Filter<Contrato>,
  ): Promise<Contrato[]> {
    return this.contratoRepository.find(filter);
  }

  @get('/contrato/{id}')
  @response(200, {
    description: 'Información del contrato',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contrato, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contrato, {exclude: 'where'}) filter?: FilterExcludingWhere<Contrato>
  ): Promise<Contrato> {
    return this.contratoRepository.findById(id, filter);
  }

  @patch('/contrato/{id}')
  @response(204, {
    description: 'Se ha actualizado el contrato correctamente',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contrato, {partial: true}),
        },
      },
    })
    contrato: Contrato,
  ): Promise<void> {
    await this.contratoRepository.updateById(id, contrato);
  }

  @put('/contrato/{id}')
  @response(204, {
    description: 'Se ha actualizado el contrato correctamente',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contrato: Contrato,
  ): Promise<void> {
    await this.contratoRepository.replaceById(id, contrato);
  }

  @del('/contrato/{id}')
  @response(204, {
    description: 'Se ha elimicado el contrato correctamente',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contratoRepository.deleteById(id);
  }
}
