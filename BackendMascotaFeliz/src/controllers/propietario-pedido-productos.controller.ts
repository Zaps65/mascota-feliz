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
  PedidoProductos,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioPedidoProductosController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many PedidoProductos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoProductos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoProductos>,
  ): Promise<PedidoProductos[]> {
    return this.propietarioRepository.pedidoProductos(id).find(filter);
  }

  @post('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProductos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {
            title: 'NewPedidoProductosInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) pedidoProductos: Omit<PedidoProductos, 'id'>,
  ): Promise<PedidoProductos> {
    return this.propietarioRepository.pedidoProductos(id).create(pedidoProductos);
  }

  @patch('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario.PedidoProductos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProductos, {partial: true}),
        },
      },
    })
    pedidoProductos: Partial<PedidoProductos>,
    @param.query.object('where', getWhereSchemaFor(PedidoProductos)) where?: Where<PedidoProductos>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoProductos(id).patch(pedidoProductos, where);
  }

  @del('/propietarios/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Propietario.PedidoProductos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProductos)) where?: Where<PedidoProductos>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoProductos(id).delete(where);
  }
}
