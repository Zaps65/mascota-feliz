import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistorialVisitaDomiciliaria,
  Mascota,
} from '../models';
import {HistorialVisitaDomiciliariaRepository} from '../repositories';

export class HistorialVisitaDomiciliariaMascotaController {
  constructor(
    @repository(HistorialVisitaDomiciliariaRepository)
    public historialVisitaDomiciliariaRepository: HistorialVisitaDomiciliariaRepository,
  ) { }

  @get('/historial-visita-domiciliarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to HistorialVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof HistorialVisitaDomiciliaria.prototype.id,
  ): Promise<Mascota> {
    return this.historialVisitaDomiciliariaRepository.mascota(id);
  }
}
