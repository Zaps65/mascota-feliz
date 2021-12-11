import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, PedidoPlan, PedidoProductos, PedidoServicio, Mascota, Contrato, SolicitudAfiliacion} from '../models';
import {PedidoPlanRepository} from './pedido-plan.repository';
import {PedidoProductosRepository} from './pedido-productos.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';
import {MascotaRepository} from './mascota.repository';
import {ContratoRepository} from './contrato.repository';
import {SolicitudAfiliacionRepository} from './solicitud-afiliacion.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly pedidoPlans: HasManyRepositoryFactory<PedidoPlan, typeof Propietario.prototype.id>;

  public readonly pedidoProductos: HasManyRepositoryFactory<PedidoProductos, typeof Propietario.prototype.id>;

  public readonly pedidoServicios: HasManyRepositoryFactory<PedidoServicio, typeof Propietario.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Propietario.prototype.id>;

  public readonly contratoes: HasManyRepositoryFactory<Contrato, typeof Propietario.prototype.id>;

  public readonly solicitudAfiliacions: HasManyRepositoryFactory<SolicitudAfiliacion, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidoPlanRepository') protected pedidoPlanRepositoryGetter: Getter<PedidoPlanRepository>, @repository.getter('PedidoProductosRepository') protected pedidoProductosRepositoryGetter: Getter<PedidoProductosRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ContratoRepository') protected contratoRepositoryGetter: Getter<ContratoRepository>, @repository.getter('SolicitudAfiliacionRepository') protected solicitudAfiliacionRepositoryGetter: Getter<SolicitudAfiliacionRepository>,
  ) {
    super(Propietario, dataSource);
    this.solicitudAfiliacions = this.createHasManyRepositoryFactoryFor('solicitudAfiliacions', solicitudAfiliacionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAfiliacions', this.solicitudAfiliacions.inclusionResolver);
    this.contratoes = this.createHasManyRepositoryFactoryFor('contratoes', contratoRepositoryGetter,);
    this.registerInclusionResolver('contratoes', this.contratoes.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidoServicios = this.createHasManyRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.pedidoProductos = this.createHasManyRepositoryFactoryFor('pedidoProductos', pedidoProductosRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.pedidoPlans = this.createHasManyRepositoryFactoryFor('pedidoPlans', pedidoPlanRepositoryGetter,);
    this.registerInclusionResolver('pedidoPlans', this.pedidoPlans.inclusionResolver);
  }
}
