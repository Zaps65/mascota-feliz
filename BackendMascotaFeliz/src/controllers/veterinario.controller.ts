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
import {Veterinario} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository : VeterinarioRepository,
  ) {}

  @post('/veterinario')
  @response(200, {
    description: 'Veterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario> {
    return this.veterinarioRepository.create(veterinario);
  }

  @get('/veterinario/count')
  @response(200, {
    description: 'Veterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.count(where);
  }

  @get('/veterinario')
  @response(200, {
    description: 'Array of Veterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinario) filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.veterinarioRepository.find(filter);
  }

  @patch('/veterinario')
  @response(200, {
    description: 'Veterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.updateAll(veterinario, where);
  }

  @get('/veterinario/{id}')
  @response(200, {
    description: 'Veterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinario>
  ): Promise<Veterinario> {
    return this.veterinarioRepository.findById(id, filter);
  }

  @patch('/veterinario/{id}')
  @response(204, {
    description: 'Veterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.updateById(id, veterinario);
  }

  @put('/veterinario/{id}')
  @response(204, {
    description: 'Veterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.replaceById(id, veterinario);
  }

  @del('/veterinario/{id}')
  @response(204, {
    description: 'Veterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinarioRepository.deleteById(id);
  }
}
