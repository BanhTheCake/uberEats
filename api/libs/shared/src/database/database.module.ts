import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { validateEnv } from '../utils/ValidateEnv';

@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {
  static register(entities: TypeOrmModuleOptions['entities']): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configServices: ConfigService): TypeOrmModuleOptions => {
            const [POSTGRES_TYPE, POSTGRES_URL] = validateEnv(
              ['POSTGRES_TYPE', 'POSTGRES_URL'],
              configServices,
            );
            const options: TypeOrmModuleOptions = {
              type: POSTGRES_TYPE,
              url: POSTGRES_URL,
            };
            return {
              ...options,
              entities,
              synchronize: true,
              // migrations: ['./dist/app/auth/src/migration/*.{js,ts}'],
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
