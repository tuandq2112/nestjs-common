import { BaseEntity } from '../dao/model/base.entity';
import { BaseRepository } from '../dao/repository';
import { PaginationDTO } from '../dto/pagination.dto';

export class PaginationHelper<Entity extends BaseEntity> {
  constructor(private readonly repository: BaseRepository<Entity>) {}

  async paginate(
    query: any = { page: 0, size: 10 },
  ): Promise<PaginationDTO<Entity>> {
    return new Promise<PaginationDTO<Entity>>((resolve, reject) => {
      const { page, size } = query;
      const skip = page * size;

      this.repository
        .findAndCount({
          skip,
          take: size,
        })
        .then(([results, totalElements]) => {
          const totalPages: number = Math.ceil(totalElements / size);
          const pageNumber: number = page;
          const pageSize: number = size;
          const numberOfElements: number = results.length;
          resolve({
            data: results,
            totalPages,
            pageNumber,
            pageSize,
            numberOfElements,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
