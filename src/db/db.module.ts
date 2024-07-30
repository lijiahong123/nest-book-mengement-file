import { DynamicModule, Module } from '@nestjs/common';
import { DBService } from './db.service';

export type DBModuleOptions = {
  path: string;
};

@Module({})
export class DbModule {
  static registry(options: DBModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        DBService,
      ],
      exports: [DBService],
    };
  }
}
