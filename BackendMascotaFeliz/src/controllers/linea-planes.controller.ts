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
import {LineaPlanes} from '../models';
import {LineaPlanesRepository} from '../repositories';

export class LineaPlanesController {
  constructor(
    @repository(LineaPlanesRepository)
    public lineaPlanesRepository : LineaPlanesRepository,
  ) {}

  @post('/linea-planes')
  @response(200, {
    description: 'LineaPlanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaPlanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaPlanes, {
            title: 'NewLineaPlanes',
            exclude: ['id'],
          }),
        },
      },
    })
    lineaPlanes: Omit<LineaPlanes, 'id'>,
  ): Promise<LineaPlanes> {
    return this.lineaPlanesRepository.create(lineaPlanes);
  }

  @get('/linea-planes/count')
  @response(200, {
    description: 'LineaPlanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaPlanes) where?: Where<LineaPlanes>,
  ): Promise<Count> {
    return this.lineaPlanesRepository.count(where);
  }

  @get('/linea-planes')
  @response(200, {
    description: 'Array of LineaPlanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaPlanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaPlanes) filter?: Filter<LineaPlanes>,
  ): Promise<LineaPlanes[]> {
    return this.lineaPlanesRepository.find(filter);
  }

  @patch('/linea-planes')
  @response(200, {
    description: 'LineaPlanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaPlanes, {partial: true}),
        },
      },
    })
    lineaPlanes: LineaPlanes,
    @param.where(LineaPlanes) where?: Where<LineaPlanes>,
  ): Promise<Count> {
    return this.lineaPlanesRepository.updateAll(lineaPlanes, where);
  }

  @get('/linea-planes/{id}')
  @response(200, {
    description: 'LineaPlanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaPlanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LineaPlanes, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaPlanes>
  ): Promise<LineaPlanes> {
    return this.lineaPlanesRepository.findById(id, filter);
  }

  @patch('/linea-planes/{id}')
  @response(204, {
    description: 'LineaPlanes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaPlanes, {partial: true}),
        },
      },
    })
    lineaPlanes: LineaPlanes,
  ): Promise<void> {
    await this.lineaPlanesRepository.updateById(id, lineaPlanes);
  }

  @put('/linea-planes/{id}')
  @response(204, {
    description: 'LineaPlanes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lineaPlanes: LineaPlanes,
  ): Promise<void> {
    await this.lineaPlanesRepository.replaceById(id, lineaPlanes);
  }

  @del('/linea-planes/{id}')
  @response(204, {
    description: 'LineaPlanes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lineaPlanesRepository.deleteById(id);
  }
}
