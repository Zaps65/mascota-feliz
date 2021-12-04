import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Productos, ProductosRelations, Sucursal, Proveedor, PedidoProducto, LineaProductos} from '../models';
import {SucursalRepository} from './sucursal.repository';
import {ProveedorRepository} from './proveedor.repository';
import {LineaProductosRepository} from './linea-productos.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Productos.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Productos.prototype.id>;

  public readonly pedidoProductos: HasManyThroughRepositoryFactory<PedidoProducto, typeof PedidoProducto.prototype.id,
          LineaProductos,
          typeof Productos.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('LineaProductosRepository') protected lineaProductosRepositoryGetter: Getter<LineaProductosRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>,
  ) {
    super(Productos, dataSource);
    this.pedidoProductos = this.createHasManyThroughRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter, lineaProductosRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
  }
}
