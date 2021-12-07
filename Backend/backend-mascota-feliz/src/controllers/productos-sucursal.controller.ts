import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  Sucursal,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosSucursalController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Productos.prototype.id,
  ): Promise<Sucursal> {
    return this.productosRepository.sucursal(id);
  }
}
