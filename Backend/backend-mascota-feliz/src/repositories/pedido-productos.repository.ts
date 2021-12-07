import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoProductos, PedidoProductosRelations} from '../models';

export class PedidoProductosRepository extends DefaultCrudRepository<
  PedidoProductos,
  typeof PedidoProductos.prototype.id,
  PedidoProductosRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(PedidoProductos, dataSource);
  }
}
