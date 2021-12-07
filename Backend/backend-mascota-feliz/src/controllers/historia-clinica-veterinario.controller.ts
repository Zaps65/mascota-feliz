import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaClinica,
  Veterinario,
} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaVeterinarioController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @get('/historia-clinicas/{id}/veterinario', {
    responses: {
      '200': {
        description: 'Veterinario belonging to HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async getVeterinario(
    @param.path.string('id') id: typeof HistoriaClinica.prototype.id,
  ): Promise<Veterinario> {
    return this.historiaClinicaRepository.veterinario(id);
  }
}
