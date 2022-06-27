"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
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
exports.default = config;
//# sourceMappingURL=ormconfig.js.map