import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PedidoPlan} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanController {
  constructor(
    @repository(PedidoPlanRepository)
    public pedidoPlanRepository : PedidoPlanRepository,
  ) {}

  @post('/pedido-plan')
  @response(200, {
    description: 'Se crea un nuevo pedido del plan',
    content: {'application/json': {schema: getModelSchemaRef(PedidoPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {
            title: 'NuevoPedidoPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoPlan: Omit<PedidoPlan, 'id'>,
  ): Promise<PedidoPlan> {
    return this.pedidoPlanRepository.create(pedidoPlan);
  }

  @get('/pedido-plan/count')
  @response(200, {
    description: 'Cantidad total de pedidos del plan',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoPlan) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.pedidoPlanRepository.count(where);
  }

  @get('/pedido-plan')
  @response(200, {
    description: 'Lista de los pedidos del plan',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidoPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidoPlan) filter?: Filter<PedidoPlan>,
  ): Promise<PedidoPlan[]> {
    return this.pedidoPlanRepository.find(filter);
  }

  @get('/pedido-plan/{id}')
  @response(200, {
    description: 'Información del pedido del plan',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidoPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PedidoPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoPlan>
  ): Promise<PedidoPlan> {
    return this.pedidoPlanRepository.findById(id, filter);
  }

  @patch('/pedido-plan/{id}')
  @response(204, {
    description: 'Se ha actualizado el pedido del plan',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {partial: true}),
        },
      },
    })
    pedidoPlan: PedidoPlan,
  ): Promise<void> {
    await this.pedidoPlanRepository.updateById(id, pedidoPlan);
  }

  @put('/pedido-plan/{id}')
  @response(204, {
    description: 'Se ha actualizado el pedido del plan',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoPlan: PedidoPlan,
  ): Promise<void> {
    await this.pedidoPlanRepository.replaceById(id, pedidoPlan);
  }

  @del('/pedido-plan/{id}')
  @response(204, {
    description: 'Se ha eliminado el pedido del plan',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoPlanRepository.deleteById(id);
  }
}
