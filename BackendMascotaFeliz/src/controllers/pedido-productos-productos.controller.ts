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
PedidoProductos,
Productos,
} from '../models';
import {PedidoProductosRepository} from '../repositories';

export class PedidoProductosProductosController {
  constructor(
    @repository(PedidoProductosRepository) protected pedidoProductosRepository: PedidoProductosRepository,
  ) { }

  @get('/pedido-producto/{id}/producto', {
    responses: {
      '200': {
        description: 'Lista de los productos que hay en el pedido de productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.pedidoProductosRepository.productos(id).find(filter);
  }

  @post('/pedido-producto/{id}/producto', {
    responses: {
      '200': {
        description: 'Se agrega un nuevo producto a la línea de productos',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoProductos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NuevoProductoEnPedidoProductos',
            exclude: ['id'],
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.pedidoProductosRepository.productos(id).create(productos);
  }

  @patch('/pedido-producto/{id}/producto', {
    responses: {
      '200': {
        description: 'Se ha actualizado la lista de productos',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.pedidoProductosRepository.productos(id).patch(productos, where);
  }

  @del('/pedido-producto/{id}/producto', {
    responses: {
      '200': {
        description: 'PedidoProductos.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.pedidoProductosRepository.productos(id).delete(where);
  }
}
