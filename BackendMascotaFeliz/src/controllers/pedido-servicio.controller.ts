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
import {PedidoServicio} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioController {
  constructor(
    @repository(PedidoServicioRepository)
    public pedidoServicioRepository : PedidoServicioRepository,
  ) {}

  @post('/pedido-servicio')
  @response(200, {
    description: 'PedidoServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(PedidoServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {
            title: 'NewPedidoServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoServicio: Omit<PedidoServicio, 'id'>,
  ): Promise<PedidoServicio> {
    return this.pedidoServicioRepository.create(pedidoServicio);
  }

  @get('/pedido-servicio/count')
  @response(200, {
    description: 'PedidoServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoServicio) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.count(where);
  }

  @get('/pedido-servicio')
  @response(200, {
    description: 'Array of PedidoServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidoServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidoServicio) filter?: Filter<PedidoServicio>,
  ): Promise<PedidoServicio[]> {
    return this.pedidoServicioRepository.find(filter);
  }

  @patch('/pedido-servicio')
  @response(200, {
    description: 'PedidoServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {partial: true}),
        },
      },
    })
    pedidoServicio: PedidoServicio,
    @param.where(PedidoServicio) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.updateAll(pedidoServicio, where);
  }

  @get('/pedido-servicio/{id}')
  @response(200, {
    description: 'PedidoServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidoServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PedidoServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoServicio>
  ): Promise<PedidoServicio> {
    return this.pedidoServicioRepository.findById(id, filter);
  }

  @patch('/pedido-servicio/{id}')
  @response(204, {
    description: 'PedidoServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {partial: true}),
        },
      },
    })
    pedidoServicio: PedidoServicio,
  ): Promise<void> {
    await this.pedidoServicioRepository.updateById(id, pedidoServicio);
  }

  @put('/pedido-servicio/{id}')
  @response(204, {
    description: 'PedidoServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoServicio: PedidoServicio,
  ): Promise<void> {
    await this.pedidoServicioRepository.replaceById(id, pedidoServicio);
  }

  @del('/pedido-servicio/{id}')
  @response(204, {
    description: 'PedidoServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoServicioRepository.deleteById(id);
  }
}
