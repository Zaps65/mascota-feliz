import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PlanesMascotas, PlanesMascotasRelations} from '../models';

export class PlanesMascotasRepository extends DefaultCrudRepository<
  PlanesMascotas,
  typeof PlanesMascotas.prototype.id,
  PlanesMascotasRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PlanesMascotas, dataSource);
  }
}
