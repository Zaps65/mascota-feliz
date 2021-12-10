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
import {HistoriaClinica} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository : HistoriaClinicaRepository,
  ) {}

  @post('/historia-clinica')
  @response(200, {
    description: 'Se ha creado una nueva historia clinica',
    content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinica',
            exclude: ['id'],
          }),
        },
      },
    })
    historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.historiaClinicaRepository.create(historiaClinica);
  }

  @get('/historia-clinica')
  @response(200, {
    description: 'Lista de historias clinicas',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistoriaClinica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistoriaClinica) filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.historiaClinicaRepository.find(filter);
  }

  @get('/historia-clinica/{id}')
  @response(200, {
    description: 'Información de una historia clinica',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistoriaClinica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HistoriaClinica, {exclude: 'where'}) filter?: FilterExcludingWhere<HistoriaClinica>
  ): Promise<HistoriaClinica> {
    return this.historiaClinicaRepository.findById(id, filter);
  }

  @patch('/historia-clinica/{id}')
  @response(204, {
    description: 'Se ha actualizado la historia clinica',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: HistoriaClinica,
  ): Promise<void> {
    await this.historiaClinicaRepository.updateById(id, historiaClinica);
  }

  @put('/historia-clinica/{id}')
  @response(204, {
    description: 'se ha actualizado la historia clinica',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historiaClinica: HistoriaClinica,
  ): Promise<void> {
    await this.historiaClinicaRepository.replaceById(id, historiaClinica);
  }

  @del('/historia-clinica/{id}')
  @response(204, {
    description: 'Se ha eliminado la historia clinica',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historiaClinicaRepository.deleteById(id);
  }
}
