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
  PedidoServicio,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioPedidoServicioController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Array of Propietario has many PedidoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoServicio>,
  ): Promise<PedidoServicio[]> {
    return this.propietarioRepository.pedidoServicios(id).find(filter);
  }

  @post('/propietarios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {
            title: 'NewPedidoServicioInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) pedidoServicio: Omit<PedidoServicio, 'id'>,
  ): Promise<PedidoServicio> {
    return this.propietarioRepository.pedidoServicios(id).create(pedidoServicio);
  }

  @patch('/propietarios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Propietario.PedidoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {partial: true}),
        },
      },
    })
    pedidoServicio: Partial<PedidoServicio>,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoServicios(id).patch(pedidoServicio, where);
  }

  @del('/propietarios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Propietario.PedidoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoServicios(id).delete(where);
  }
}
