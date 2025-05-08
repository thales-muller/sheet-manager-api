import 'dotenv/config';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

console.log('Loading MikroORM configuration...');
console.log('Environment Variables:', {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
});

const config: Options = {
    driver: PostgreSqlDriver,    
    entities: ['./src/entities/**/*.ts'], // Add dist path after build: ['./src/entities/**/*.ts', './dist/entities/**/*.js'],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    extensions: [Migrator],
    migrations: {
        path: './src/migrations',
        glob: '!(*.d).{js,ts}', 
      },

};

export default config;
