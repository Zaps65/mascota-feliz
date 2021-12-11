import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SolicitudAfiliacion, SolicitudAfiliacionRelations, Contrato, Asesor, Propietario, Mascota} from '../models';
import {ContratoRepository} from './contrato.repository';
import {AsesorRepository} from './asesor.repository';
import {PropietarioRepository} from './propietario.repository';
import {MascotaRepository} from './mascota.repository';

export class SolicitudAfiliacionRepository extends DefaultCrudRepository<
  SolicitudAfiliacion,
  typeof SolicitudAfiliacion.prototype.id,
  SolicitudAfiliacionRelations
> {

  public readonly contrato: HasOneRepositoryFactory<Contrato, typeof SolicitudAfiliacion.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof SolicitudAfiliacion.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof SolicitudAfiliacion.prototype.id>;

  public readonly mascota: HasOneRepositoryFactory<Mascota, typeof SolicitudAfiliacion.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ContratoRepository') protected contratoRepositoryGetter: Getter<ContratoRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(SolicitudAfiliacion, dataSource);
    this.mascota = this.createHasOneRepositoryFactoryFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.contrato = this.createHasOneRepositoryFactoryFor('contrato', contratoRepositoryGetter);
    this.registerInclusionResolver('contrato', this.contrato.inclusionResolver);
  }
}
