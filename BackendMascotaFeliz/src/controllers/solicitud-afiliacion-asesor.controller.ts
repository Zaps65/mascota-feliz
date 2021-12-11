import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudAfiliacion,
  Asesor,
} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionAsesorController {
  constructor(
    @repository(SolicitudAfiliacionRepository)
    public solicitudAfiliacionRepository: SolicitudAfiliacionRepository,
  ) { }

  @get('/solicitud-afiliaciones/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof SolicitudAfiliacion.prototype.id,
  ): Promise<Asesor> {
    return this.solicitudAfiliacionRepository.asesor(id);
  }
}
