import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Proveedor, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
