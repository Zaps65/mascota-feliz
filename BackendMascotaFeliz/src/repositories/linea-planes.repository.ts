import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LineaPlanes, LineaPlanesRelations} from '../models';

export class LineaPlanesRepository extends DefaultCrudRepository<
  LineaPlanes,
  typeof LineaPlanes.prototype.id,
  LineaPlanesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LineaPlanes, dataSource);
  }
}
