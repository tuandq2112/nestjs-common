import { BaseEntity } from '../dao/model/base.entity';
import { BaseRepository } from '../dao/repository';
import { PaginationDTO } from '../dto/pagination.dto';

export class PaginationHelper<Entity extends BaseEntity> {
  constructor(private readonly repository: BaseRepository<Entity>) {}

  async paginate(query: any = { page: 0, size: 10 }): Promise<PaginationDTO> {
    return new Promise<PaginationDTO>((resolve, reject) => {
      const { page = 0, size = 10 } = query;
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
  public static isPaginationDTO(obj: any): boolean {
    return (
      'totalPages' in obj &&
      'pageNumber' in obj &&
      'pageSize' in obj &&
      'numberOfElements' in obj
    );
  }
}
