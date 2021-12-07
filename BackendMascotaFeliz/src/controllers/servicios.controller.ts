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
import {Servicios} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository : ServiciosRepository,
  ) {}

  @post('/servicios')
  @response(200, {
    description: 'Servicios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NewServicios',
            exclude: ['id'],
          }),
        },
      },
    })
    servicios: Omit<Servicios, 'id'>,
  ): Promise<Servicios> {
    return this.serviciosRepository.create(servicios);
  }

  @get('/servicios/count')
  @response(200, {
    description: 'Servicios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Servicios) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.serviciosRepository.count(where);
  }

  @get('/servicios')
  @response(200, {
    description: 'Array of Servicios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Servicios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Servicios) filter?: Filter<Servicios>,
  ): Promise<Servicios[]> {
    return this.serviciosRepository.find(filter);
  }

  @patch('/servicios')
  @response(200, {
    description: 'Servicios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Servicios,
    @param.where(Servicios) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.serviciosRepository.updateAll(servicios, where);
  }

  @get('/servicios/{id}')
  @response(200, {
    description: 'Servicios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Servicios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Servicios, {exclude: 'where'}) filter?: FilterExcludingWhere<Servicios>
  ): Promise<Servicios> {
    return this.serviciosRepository.findById(id, filter);
  }

  @patch('/servicios/{id}')
  @response(204, {
    description: 'Servicios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Servicios,
  ): Promise<void> {
    await this.serviciosRepository.updateById(id, servicios);
  }

  @put('/servicios/{id}')
  @response(204, {
    description: 'Servicios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() servicios: Servicios,
  ): Promise<void> {
    await this.serviciosRepository.replaceById(id, servicios);
  }

  @del('/servicios/{id}')
  @response(204, {
    description: 'Servicios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviciosRepository.deleteById(id);
  }
}
