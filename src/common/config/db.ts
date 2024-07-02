export default () => {
  return {
    type: 'postgres',
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
  };
};
