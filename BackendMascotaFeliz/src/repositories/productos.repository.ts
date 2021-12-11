import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Productos, ProductosRelations, Proveedor, Sucursal} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {SucursalRepository} from './sucursal.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Productos.prototype.id>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Productos, dataSource);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
