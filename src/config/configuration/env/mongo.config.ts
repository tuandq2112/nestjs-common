import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  mongoHost: process.env.mongoHost,
  mongoPort: process.env.mongoPort,
  mongoUser: process.env.mongoUser,
  mongoPass: process.env.mongoPass,
  mongoDatabase: process.env.mongoDatabase,
}));
