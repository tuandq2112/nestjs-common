import { DeleteResult, ObjectId } from 'typeorm';
import { BaseEntity } from '../dao/model/base.entity';
import { BaseDTO } from '../dto/base.dto';
import { Pageable } from '../dto/pageable.dto';
import { PaginationDTO } from '../dto/pagination.dto';

export interface BaseServiceInterface<
  Entity extends BaseEntity,
> {
  create(entity: any): Promise<Entity>;
  /**
   *
   * @param entities the entities
   * @returns {Entity[]}
   *
   */
  createBatch(entities: Entity[]): Promise<Entity[]>;

  getDetail(id: any): Promise<Entity>;

  search(pagination: Pageable): Promise<PaginationDTO>;
  
  update(id: ObjectId, entity: any): Promise<Entity>;

  delete(id: ObjectId): Promise<DeleteResult>;
}
