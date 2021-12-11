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

  @post('/pedido-producto')
  @response(200, {
    description: 'Se crea un nuevo pedido de productos',
    content: {'application/json': {schema: getModelSchemaRef(PedidoProductos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {
            title: 'NuevoPedidoProductos',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoProductos: Omit<PedidoProductos, 'id'>,
  ): Promise<PedidoProductos> {
    return this.pedidoProductosRepository.create(pedidoProductos);
  }

  @get('/pedido-producto/count')
  @response(200, {
    description: 'Cantidad total de pedidos de productos',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoProductos) where?: Where<PedidoProductos>,
  ): Promise<Count> {
    return this.pedidoProductosRepository.count(where);
  }

  @get('/pedido-producto')
  @response(200, {
    description: 'Lista de los pedidos de productos',
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

  @get('/pedido-producto/{id}')
  @response(200, {
    description: 'Información de un pedido de productos',
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

  @patch('/pedido-producto/{id}')
  @response(204, {
    description: 'Se ha actualizado el pedido de productos',
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

  @put('/pedido-producto/{id}')
  @response(204, {
    description: 'Se ha actualizado el pedido de productos',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoProductos: PedidoProductos,
  ): Promise<void> {
    await this.pedidoProductosRepository.replaceById(id, pedidoProductos);
  }

  @del('/pedido-producto/{id}')
  @response(204, {
    description: 'Se ha eliminado el pedido de productos',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoProductosRepository.deleteById(id);
  }
}
