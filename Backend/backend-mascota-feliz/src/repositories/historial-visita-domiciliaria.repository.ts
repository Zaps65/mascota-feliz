import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HistorialVisitaDomiciliaria, HistorialVisitaDomiciliariaRelations} from '../models';

export class HistorialVisitaDomiciliariaRepository extends DefaultCrudRepository<
  HistorialVisitaDomiciliaria,
  typeof HistorialVisitaDomiciliaria.prototype.id,
  HistorialVisitaDomiciliariaRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(HistorialVisitaDomiciliaria, dataSource);
  }
}
