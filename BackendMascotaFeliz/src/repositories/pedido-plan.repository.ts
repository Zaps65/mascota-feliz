import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoPlan, PedidoPlanRelations, Propietario, Plan, LineaPlanes} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaPlanesRepository} from './linea-planes.repository';
import {PlanRepository} from './plan.repository';

export class PedidoPlanRepository extends DefaultCrudRepository<
  PedidoPlan,
  typeof PedidoPlan.prototype.id,
  PedidoPlanRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoPlan.prototype.id>;

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          LineaPlanes,
          typeof PedidoPlan.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaPlanesRepository') protected lineaPlanesRepositoryGetter: Getter<LineaPlanesRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(PedidoPlan, dataSource);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, lineaPlanesRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
