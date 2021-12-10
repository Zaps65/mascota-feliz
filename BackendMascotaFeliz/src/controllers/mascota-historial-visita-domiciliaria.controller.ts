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
  Mascota,
  HistorialVisitaDomiciliaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaHistorialVisitaDomiciliariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascota/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Lista de historial de visitas domiciliarias de la mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistorialVisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistorialVisitaDomiciliaria>,
  ): Promise<HistorialVisitaDomiciliaria[]> {
    return this.mascotaRepository.historialVisitaDomiciliarias(id).find(filter);
  }
}
