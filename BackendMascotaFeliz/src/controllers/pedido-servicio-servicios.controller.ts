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
PedidoServicio,
LineaServicios,
Servicios,
} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioServiciosController {
  constructor(
    @repository(PedidoServicioRepository) protected pedidoServicioRepository: PedidoServicioRepository,
  ) { }

  @get('/pedido-servicio/{id}/servicio', {
    responses: {
      '200': {
        description: 'Lista de los servicios de un pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicios>,
  ): Promise<Servicios[]> {
    return this.pedidoServicioRepository.servicios(id).find(filter);
  }

  @post('/pedido-servicio/{id}/servicio', {
    responses: {
      '200': {
        description: 'Se crea una nueva línea de servicios en un pedido',
        content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NuevoServicioEnPedidoServicio',
            exclude: ['id'],
          }),
        },
      },
    }) servicios: Omit<Servicios, 'id'>,
  ): Promise<Servicios> {
    return this.pedidoServicioRepository.servicios(id).create(servicios);
  }

  @patch('/pedido-servicio/{id}/servicio', {
    responses: {
      '200': {
        description: 'PedidoServicio.Servicios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Partial<Servicios>,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.servicios(id).patch(servicios, where);
  }

  @del('/pedido-servicio/{id}/servicio', {
    responses: {
      '200': {
        description: 'Se ha eliminado el servicio del pedido',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.servicios(id).delete(where);
  }
}
