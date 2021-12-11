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
import {Planes} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesController {
  constructor(
    @repository(PlanesRepository)
    public planesRepository : PlanesRepository,
  ) {}

  @post('/planes')
  @response(200, {
    description: 'Planes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Planes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanes',
            exclude: ['id'],
          }),
        },
      },
    })
    planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.planesRepository.create(planes);
  }

  @get('/planes/count')
  @response(200, {
    description: 'Planes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Planes) where?: Where<Planes>,
  ): Promise<Count> {
    return this.planesRepository.count(where);
  }

  @get('/planes')
  @response(200, {
    description: 'Array of Planes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Planes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Planes) filter?: Filter<Planes>,
  ): Promise<Planes[]> {
    return this.planesRepository.find(filter);
  }

  @patch('/planes')
  @response(200, {
    description: 'Planes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Planes,
    @param.where(Planes) where?: Where<Planes>,
  ): Promise<Count> {
    return this.planesRepository.updateAll(planes, where);
  }

  @get('/planes/{id}')
  @response(200, {
    description: 'Planes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Planes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planes, {exclude: 'where'}) filter?: FilterExcludingWhere<Planes>
  ): Promise<Planes> {
    return this.planesRepository.findById(id, filter);
  }

  @patch('/planes/{id}')
  @response(204, {
    description: 'Planes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Planes,
  ): Promise<void> {
    await this.planesRepository.updateById(id, planes);
  }

  @put('/planes/{id}')
  @response(204, {
    description: 'Planes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() planes: Planes,
  ): Promise<void> {
    await this.planesRepository.replaceById(id, planes);
  }

  @del('/planes/{id}')
  @response(204, {
    description: 'Planes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.planesRepository.deleteById(id);
  }
}
