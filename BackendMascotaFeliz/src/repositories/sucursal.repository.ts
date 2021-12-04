import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.id,
  SucursalRelations
> {

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Sucursal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Sucursal, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
