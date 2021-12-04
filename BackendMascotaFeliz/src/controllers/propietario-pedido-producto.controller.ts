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
  PedidoProducto,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioPedidoProductoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many PedidoProducto',
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
    return this.propietarioRepository.pedidoProductos(id).find(filter);
  }

  @post('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProductoInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) pedidoProducto: Omit<PedidoProducto, 'id'>,
  ): Promise<PedidoProducto> {
    return this.propietarioRepository.pedidoProductos(id).create(pedidoProducto);
  }

  @patch('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario.PedidoProducto PATCH success count',
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
    return this.propietarioRepository.pedidoProductos(id).patch(pedidoProducto, where);
  }

  @del('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario.PedidoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoProductos(id).delete(where);
  }
}
