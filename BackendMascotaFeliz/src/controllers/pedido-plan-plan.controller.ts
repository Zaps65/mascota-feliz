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
Plan,
} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanPlanController {
  constructor(
    @repository(PedidoPlanRepository) protected pedidoPlanRepository: PedidoPlanRepository,
  ) { }

  @get('/pedido-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of PedidoPlan has many Plan through LineaPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.pedidoPlanRepository.plans(id).find(filter);
  }

  @post('/pedido-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'create a Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoPlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInPedidoPlan',
            exclude: ['id'],
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.pedidoPlanRepository.plans(id).create(plan);
  }

  @patch('/pedido-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'PedidoPlan.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.pedidoPlanRepository.plans(id).patch(plan, where);
  }

  @del('/pedido-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'PedidoPlan.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.pedidoPlanRepository.plans(id).delete(where);
  }
}
