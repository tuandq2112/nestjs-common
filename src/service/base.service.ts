import { DeleteResult } from 'typeorm';
import { BaseEntity } from '../dao/model/base.entity';
import { BaseRepository } from '../dao/repository';
import { PaginationDTO } from '../dto/pagination.dto';
import { BaseServiceInterface } from '../interface/base.service.interface';
import { PaginationHelper } from '../utils/paginate.helper';
export abstract class BaseService<Entity extends BaseEntity>
  implements BaseServiceInterface<Entity>
{
  constructor(private readonly repository: BaseRepository<Entity>) {}
  /**
   *
   * @param entity the entity
   * @returns {Entity}
   *
   */
  public async create(entity: any): Promise<Entity> {
    return new Promise<Entity>((resolve, reject) => {
      this.repository
        .save(entity)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   *
   * @param entities the entities
   * @returns {Entity[]}
   *
   */
  public async createBatch(entities: Entity[]): Promise<Entity[]> {
    return new Promise<Entity[]>((resolve, reject) => {
      this.repository
        .save(entities)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getDetail(id: any): Promise<Entity> {
    return new Promise<Entity>((resolve, reject) => {
      this.repository
        .findOneOrFail(id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async search(query: any): Promise<PaginationDTO> {
    return new Promise<PaginationDTO>((resolve, reject) => {
      const paginateHelper = new PaginationHelper<Entity>(this.repository);
      paginateHelper
        .paginate(query)
        .then((pagination) => {
          resolve(pagination);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async update(id: any, entity: any): Promise<Entity> {
    return new Promise((resolve, reject) => {
      this.getDetail(id)
        .then((existEntity) => {
          Object.assign(existEntity, { ...entity, id });
          return this.repository.save(existEntity);
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async delete(id: any): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.repository
        .delete(id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
