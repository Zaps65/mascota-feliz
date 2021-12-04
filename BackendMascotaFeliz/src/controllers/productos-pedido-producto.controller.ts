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
Productos,
LineaProductos,
PedidoProducto,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosPedidoProductoController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Productos has many PedidoProducto through LineaProductos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoProducto>,
  ): Promise<PedidoProducto[]> {
    return this.productosRepository.pedidoProductos(id).find(filter);
  }

  @post('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'create a PedidoProducto model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProductoInProductos',
            exclude: ['id'],
          }),
        },
      },
    }) pedidoProducto: Omit<PedidoProducto, 'id'>,
  ): Promise<PedidoProducto> {
    return this.productosRepository.pedidoProductos(id).create(pedidoProducto);
  }

  @patch('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Productos.PedidoProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {partial: true}),
        },
      },
    })
    pedidoProducto: Partial<PedidoProducto>,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.productosRepository.pedidoProductos(id).patch(pedidoProducto, where);
  }

  @del('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Productos.PedidoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.productosRepository.pedidoProductos(id).delete(where);
  }
}
