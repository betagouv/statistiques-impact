import { DataSource } from 'typeorm';
import { config } from './config';
import { Indicator } from './modules/indicator';

const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    logging: true,
    entities: [Indicator],
    subscribers: [],
    migrations: ['**/migrations/*.js'],
});

export { dataSource };
