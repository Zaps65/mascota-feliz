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
  Mascota,
} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoMascotaController {
  constructor(
    @repository(ContratoRepository)
    public contratoRepository: ContratoRepository,
  ) { }

  @get('/contrato/{id}/mascota', {
    responses: {
      '200': {
        description: 'La mascota relacionada con el contrato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Contrato.prototype.id,
  ): Promise<Mascota> {
    return this.contratoRepository.mascota(id);
  }
}
