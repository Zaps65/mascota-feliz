import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contrato,
  SolicitudAfiliacion,
} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoSolicitudAfiliacionController {
  constructor(
    @repository(ContratoRepository)
    public contratoRepository: ContratoRepository,
  ) { }

  @get('/contratos/{id}/solicitud-afiliacion', {
    responses: {
      '200': {
        description: 'SolicitudAfiliacion belonging to Contrato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAfiliacion)},
          },
        },
      },
    },
  })
  async getSolicitudAfiliacion(
    @param.path.string('id') id: typeof Contrato.prototype.id,
  ): Promise<SolicitudAfiliacion> {
    return this.contratoRepository.solicitudAfiliacion(id);
  }
}
