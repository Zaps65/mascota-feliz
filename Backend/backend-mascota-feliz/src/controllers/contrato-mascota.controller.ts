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

  @get('/contratoes/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Contrato',
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
