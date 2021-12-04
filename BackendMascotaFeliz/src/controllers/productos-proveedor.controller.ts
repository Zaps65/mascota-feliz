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
  Proveedor,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosProveedorController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Productos.prototype.id,
  ): Promise<Proveedor> {
    return this.productosRepository.proveedor(id);
  }
}
