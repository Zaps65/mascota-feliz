import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mascota, MascotaRelations, PedidoPlan, Propietario, Contrato, HistorialVisitaDomiciliaria, HistoriaClinica} from '../models';
import {PedidoPlanRepository} from './pedido-plan.repository';
import {PropietarioRepository} from './propietario.repository';
import {ContratoRepository} from './contrato.repository';
import {HistorialVisitaDomiciliariaRepository} from './historial-visita-domiciliaria.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly pedidoPlans: HasManyRepositoryFactory<PedidoPlan, typeof Mascota.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Mascota.prototype.id>;

  public readonly contrato: HasOneRepositoryFactory<Contrato, typeof Mascota.prototype.id>;

  public readonly historialVisitaDomiciliarias: HasManyRepositoryFactory<HistorialVisitaDomiciliaria, typeof Mascota.prototype.id>;

  public readonly historiaClinicas: HasManyRepositoryFactory<HistoriaClinica, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidoPlanRepository') protected pedidoPlanRepositoryGetter: Getter<PedidoPlanRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ContratoRepository') protected contratoRepositoryGetter: Getter<ContratoRepository>, @repository.getter('HistorialVisitaDomiciliariaRepository') protected historialVisitaDomiciliariaRepositoryGetter: Getter<HistorialVisitaDomiciliariaRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(Mascota, dataSource);
    this.historiaClinicas = this.createHasManyRepositoryFactoryFor('historiaClinicas', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinicas', this.historiaClinicas.inclusionResolver);
    this.historialVisitaDomiciliarias = this.createHasManyRepositoryFactoryFor('historialVisitaDomiciliarias', historialVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('historialVisitaDomiciliarias', this.historialVisitaDomiciliarias.inclusionResolver);
    this.contrato = this.createHasOneRepositoryFactoryFor('contrato', contratoRepositoryGetter);
    this.registerInclusionResolver('contrato', this.contrato.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.pedidoPlans = this.createHasManyRepositoryFactoryFor('pedidoPlans', pedidoPlanRepositoryGetter,);
    this.registerInclusionResolver('pedidoPlans', this.pedidoPlans.inclusionResolver);
  }
}
