import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, PedidoPlan, LineaPlanes, Mascota, PlanMascota} from '../models';
import {LineaPlanesRepository} from './linea-planes.repository';
import {PedidoPlanRepository} from './pedido-plan.repository';
import {PlanMascotaRepository} from './plan-mascota.repository';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly pedidoPlans: HasManyThroughRepositoryFactory<PedidoPlan, typeof PedidoPlan.prototype.id,
          LineaPlanes,
          typeof Plan.prototype.id
        >;

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.id,
          PlanMascota,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LineaPlanesRepository') protected lineaPlanesRepositoryGetter: Getter<LineaPlanesRepository>, @repository.getter('PedidoPlanRepository') protected pedidoPlanRepositoryGetter: Getter<PedidoPlanRepository>, @repository.getter('PlanMascotaRepository') protected planMascotaRepositoryGetter: Getter<PlanMascotaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, planMascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidoPlans = this.createHasManyThroughRepositoryFactoryFor('pedidoPlans', pedidoPlanRepositoryGetter, lineaPlanesRepositoryGetter,);
    this.registerInclusionResolver('pedidoPlans', this.pedidoPlans.inclusionResolver);
  }
}
