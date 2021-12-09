import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoProductos, PedidoProductosRelations, Propietario, Productos, LineaProductos, Empleado} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaProductosRepository} from './linea-productos.repository';
import {ProductosRepository} from './productos.repository';
import {EmpleadoRepository} from './empleado.repository';

export class PedidoProductosRepository extends DefaultCrudRepository<
  PedidoProductos,
  typeof PedidoProductos.prototype.id,
  PedidoProductosRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoProductos.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Productos, typeof Productos.prototype.id,
          LineaProductos,
          typeof PedidoProductos.prototype.id
        >;

  public readonly empleado: BelongsToAccessor<Empleado, typeof PedidoProductos.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaProductosRepository') protected lineaProductosRepositoryGetter: Getter<LineaProductosRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(PedidoProductos, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productosRepositoryGetter, lineaProductosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
