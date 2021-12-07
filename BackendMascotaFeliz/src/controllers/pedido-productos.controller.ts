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
import {PedidoProductos} from '../models';
import {PedidoProductosRepository} from '../repositories';

export class PedidoProductosController {
  constructor(
    @repository(PedidoProductosRepository)
    public pedidoProductosRepository : PedidoProductosRepository,
  ) {}

  @post('/pedido-productos')
  @response(200, {
    description: 'PedidoProductos model instance',
    content: {'application/json': {schema: getModelSchemaRef(PedidoProductos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {
            title: 'NewPedidoProductos',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoProductos: Omit<PedidoProductos, 'id'>,
  ): Promise<PedidoProductos> {
    return this.pedidoProductosRepository.create(pedidoProductos);
  }

  @get('/pedido-productos/count')
  @response(200, {
    description: 'PedidoProductos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoProductos) where?: Where<PedidoProductos>,
  ): Promise<Count> {
    return this.pedidoProductosRepository.count(where);
  }

  @get('/pedido-productos')
  @response(200, {
    description: 'Array of PedidoProductos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidoProductos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidoProductos) filter?: Filter<PedidoProductos>,
  ): Promise<PedidoProductos[]> {
    return this.pedidoProductosRepository.find(filter);
  }

  @patch('/pedido-productos')
  @response(200, {
    description: 'PedidoProductos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {partial: true}),
        },
      },
    })
    pedidoProductos: PedidoProductos,
    @param.where(PedidoProductos) where?: Where<PedidoProductos>,
  ): Promise<Count> {
    return this.pedidoProductosRepository.updateAll(pedidoProductos, where);
  }

  @get('/pedido-productos/{id}')
  @response(200, {
    description: 'PedidoProductos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidoProductos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PedidoProductos, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoProductos>
  ): Promise<PedidoProductos> {
    return this.pedidoProductosRepository.findById(id, filter);
  }

  @patch('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProductos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {partial: true}),
        },
      },
    })
    pedidoProductos: PedidoProductos,
  ): Promise<void> {
    await this.pedidoProductosRepository.updateById(id, pedidoProductos);
  }

  @put('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProductos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoProductos: PedidoProductos,
  ): Promise<void> {
    await this.pedidoProductosRepository.replaceById(id, pedidoProductos);
  }

  @del('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProductos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoProductosRepository.deleteById(id);
  }
}
