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
  Mascota,
  PedidoPlan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPedidoPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pedido-planes', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PedidoPlan',
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
    return this.mascotaRepository.pedidoPlans(id).find(filter);
  }

  @post('/mascotas/{id}/pedido-planes', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {
            title: 'NewPedidoPlanInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pedidoPlan: Omit<PedidoPlan, 'id'>,
  ): Promise<PedidoPlan> {
    return this.mascotaRepository.pedidoPlans(id).create(pedidoPlan);
  }

  @patch('/mascotas/{id}/pedido-planes', {
    responses: {
      '200': {
        description: 'Mascota.PedidoPlan PATCH success count',
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
    return this.mascotaRepository.pedidoPlans(id).patch(pedidoPlan, where);
  }

  @del('/mascotas/{id}/pedido-planes', {
    responses: {
      '200': {
        description: 'Mascota.PedidoPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoPlan)) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.mascotaRepository.pedidoPlans(id).delete(where);
  }
}
