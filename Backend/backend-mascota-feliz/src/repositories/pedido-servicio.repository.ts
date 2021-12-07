import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations} from '../models';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.id,
  PedidoServicioRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(PedidoServicio, dataSource);
  }
}
