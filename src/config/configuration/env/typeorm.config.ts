import { registerAs } from '@nestjs/config';

export default registerAs('typeOrm', () => ({
  typeOrmDatabaseType: process.env.typeOrmDatabaseType,
  typeOrmHost: process.env.typeOrmHost,
  typeOrmPort: process.env.typeOrmPort,
  typeOrmUsername: process.env.typeOrmUsername,
  typeOrmPassword: process.env.typeOrmPassword,
  typeOrmDatabase: process.env.typeOrmDatabase,
}));
