import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  winstonDir: process.env.winstonDir || '/logs',
  fileDir: process.env.fileDir || '/files',
}));
