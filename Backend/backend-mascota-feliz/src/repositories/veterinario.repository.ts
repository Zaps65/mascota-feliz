import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations} from '../models';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Veterinario, dataSource);
  }
}
