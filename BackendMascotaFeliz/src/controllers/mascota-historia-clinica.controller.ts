import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param
} from '@loopback/rest';
import {
  HistoriaClinica,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaHistoriaClinicaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascota/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Lista de historias clinicas de la mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.mascotaRepository.historiaClinicas(id).find(filter);
  }
}
