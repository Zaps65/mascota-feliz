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
import {Mascota} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository : MascotaRepository,
  ) {}

  @post('/mascota')
  @response(200, {
    description: 'Se ha creado una mascota',
    content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascota',
            exclude: ['id'],
          }),
        },
      },
    })
    mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.mascotaRepository.create(mascota);
  }

  @get('/mascota/count')
  @response(200, {
    description: 'Total de mascotas registradas',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mascota) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.mascotaRepository.count(where);
  }

  @get('/mascota')
  @response(200, {
    description: 'Lista de mascotas registradas',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mascota) filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.mascotaRepository.find(filter);
  }

  @get('/mascota/{id}')
  @response(200, {
    description: 'Información de una mascota',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mascota, {exclude: 'where'}) filter?: FilterExcludingWhere<Mascota>
  ): Promise<Mascota> {
    return this.mascotaRepository.findById(id, filter);
  }

  @patch('/mascota/{id}')
  @response(204, {
    description: 'Mascota actualizada',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Mascota,
  ): Promise<void> {
    await this.mascotaRepository.updateById(id, mascota);
  }

  @put('/mascota/{id}')
  @response(204, {
    description: 'Mascota actualizada',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mascota: Mascota,
  ): Promise<void> {
    await this.mascotaRepository.replaceById(id, mascota);
  }

  @del('/mascota/{id}')
  @response(204, {
    description: 'Mascota eliminada',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mascotaRepository.deleteById(id);
  }
}
