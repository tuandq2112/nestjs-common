import { ApiProperty } from '@nestjs/swagger';
import { IMsgResponse } from '../interface/msg_response.interface';
export class MessageResponse implements IMsgResponse<any> {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'Success' })
  message: any;
  @ApiProperty({ example: {} })
  data: any;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
  numberOfElements?: number;
  status?: number;
}
