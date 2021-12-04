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
Servicios,
LineaServicios,
PedidoServicio,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosPedidoServicioController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Array of Servicios has many PedidoServicio through LineaServicios',
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
    return this.serviciosRepository.pedidoServicios(id).find(filter);
  }

  @post('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'create a PedidoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {
            title: 'NewPedidoServicioInServicios',
            exclude: ['id'],
          }),
        },
      },
    }) pedidoServicio: Omit<PedidoServicio, 'id'>,
  ): Promise<PedidoServicio> {
    return this.serviciosRepository.pedidoServicios(id).create(pedidoServicio);
  }

  @patch('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Servicios.PedidoServicio PATCH success count',
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
    return this.serviciosRepository.pedidoServicios(id).patch(pedidoServicio, where);
  }

  @del('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Servicios.PedidoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.serviciosRepository.pedidoServicios(id).delete(where);
  }
}
