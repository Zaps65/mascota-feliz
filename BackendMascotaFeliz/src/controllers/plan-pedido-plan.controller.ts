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
Plan,
LineaPlanes,
PedidoPlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPedidoPlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many PedidoPlan through LineaPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoPlan>,
  ): Promise<PedidoPlan[]> {
    return this.planRepository.pedidoPlans(id).find(filter);
  }

  @post('/plans/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'create a PedidoPlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {
            title: 'NewPedidoPlanInPlan',
            exclude: ['id'],
          }),
        },
      },
    }) pedidoPlan: Omit<PedidoPlan, 'id'>,
  ): Promise<PedidoPlan> {
    return this.planRepository.pedidoPlans(id).create(pedidoPlan);
  }

  @patch('/plans/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Plan.PedidoPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {partial: true}),
        },
      },
    })
    pedidoPlan: Partial<PedidoPlan>,
    @param.query.object('where', getWhereSchemaFor(PedidoPlan)) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.planRepository.pedidoPlans(id).patch(pedidoPlan, where);
  }

  @del('/plans/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Plan.PedidoPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoPlan)) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.planRepository.pedidoPlans(id).delete(where);
  }
}
