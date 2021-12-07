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
LineaProductos,
Productos,
} from '../models';
import {PedidoProductosRepository} from '../repositories';

export class PedidoProductosProductosController {
  constructor(
    @repository(PedidoProductosRepository) protected pedidoProductosRepository: PedidoProductosRepository,
  ) { }

  @get('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of PedidoProductos has many Productos through LineaProductos',
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

  @post('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'create a Productos model instance',
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
            title: 'NewProductosInPedidoProductos',
            exclude: ['id'],
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.pedidoProductosRepository.productos(id).create(productos);
  }

  @patch('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'PedidoProductos.Productos PATCH success count',
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

  @del('/pedido-productos/{id}/productos', {
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