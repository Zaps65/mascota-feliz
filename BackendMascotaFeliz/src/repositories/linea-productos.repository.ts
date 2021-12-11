import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {LineaProductos, LineaProductosRelations} from '../models';

export class LineaProductosRepository extends DefaultCrudRepository<
  LineaProductos,
  typeof LineaProductos.prototype.id,
  LineaProductosRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(LineaProductos, dataSource);
  }
}
