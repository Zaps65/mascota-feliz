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
PedidoPlan,
LineaPlanes,
Planes,
} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanPlanesController {
  constructor(
    @repository(PedidoPlanRepository) protected pedidoPlanRepository: PedidoPlanRepository,
  ) { }

  @get('/pedido-plan/{id}/plan', {
    responses: {
      '200': {
        description: 'Lista de planes que van en el pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Planes>,
  ): Promise<Planes[]> {
    return this.pedidoPlanRepository.planes(id).find(filter);
  }

  @post('/pedido-plan/{id}/plan', {
    responses: {
      '200': {
        description: 'Nueva línea de plan que van en el pedido',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoPlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NuevoPlanEnPedidoPlan',
            exclude: ['id'],
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.pedidoPlanRepository.planes(id).create(planes);
  }

  @patch('/pedido-plan/{id}/plan', {
    responses: {
      '200': {
        description: 'PedidoPlan.Planes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Partial<Planes>,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.pedidoPlanRepository.planes(id).patch(planes, where);
  }

  @del('/pedido-plan/{id}/plan', {
    responses: {
      '200': {
        description: 'Se ha eliminado el plan del pedido',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.pedidoPlanRepository.planes(id).delete(where);
  }
}
