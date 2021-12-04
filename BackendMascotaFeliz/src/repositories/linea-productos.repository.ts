import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LineaProductos, LineaProductosRelations} from '../models';

export class LineaProductosRepository extends DefaultCrudRepository<
  LineaProductos,
  typeof LineaProductos.prototype.id,
  LineaProductosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LineaProductos, dataSource);
  }
}
