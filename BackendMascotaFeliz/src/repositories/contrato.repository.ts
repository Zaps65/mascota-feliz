import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Contrato, ContratoRelations, Propietario, Mascota, SolicitudAfiliacion} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {MascotaRepository} from './mascota.repository';
import {SolicitudAfiliacionRepository} from './solicitud-afiliacion.repository';

export class ContratoRepository extends DefaultCrudRepository<
  Contrato,
  typeof Contrato.prototype.id,
  ContratoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Contrato.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof Contrato.prototype.id>;

  public readonly solicitudAfiliacion: BelongsToAccessor<SolicitudAfiliacion, typeof Contrato.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SolicitudAfiliacionRepository') protected solicitudAfiliacionRepositoryGetter: Getter<SolicitudAfiliacionRepository>,
  ) {
    super(Contrato, dataSource);
    this.solicitudAfiliacion = this.createBelongsToAccessorFor('solicitudAfiliacion', solicitudAfiliacionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAfiliacion', this.solicitudAfiliacion.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
