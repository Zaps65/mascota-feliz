import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, PedidoPlan, PedidoProducto, PedidoServicio} from '../models';
import {PedidoPlanRepository} from './pedido-plan.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly pedidoPlans: HasManyRepositoryFactory<PedidoPlan, typeof Propietario.prototype.id>;

  public readonly pedidoProductos: HasManyRepositoryFactory<PedidoProducto, typeof Propietario.prototype.id>;

  public readonly pedidoServicios: HasManyRepositoryFactory<PedidoServicio, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoPlanRepository') protected pedidoPlanRepositoryGetter: Getter<PedidoPlanRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>,
  ) {
    super(Propietario, dataSource);
    this.pedidoServicios = this.createHasManyRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.pedidoProductos = this.createHasManyRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.pedidoPlans = this.createHasManyRepositoryFactoryFor('pedidoPlans', pedidoPlanRepositoryGetter,);
    this.registerInclusionResolver('pedidoPlans', this.pedidoPlans.inclusionResolver);
  }
}
