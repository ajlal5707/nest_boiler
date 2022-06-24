/**
 * this file will configure the setting of orm migration
 */

import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import 'dotenv/config';


const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_HOST),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
  entities: ['dist/**/**/entities/*.entity{ .ts,.js}'],
  synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
};

export default config