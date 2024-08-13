import { Inject, Injectable } from '@nestjs/common';
import { DBModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DBService {
  @Inject('OPTIONS')
  private options: DBModuleOptions;

  async read<T>(): Promise<T[]> {
    const filepath = this.options.path;

    try {
      await access(filepath);
    } catch (error) {
      return [];
    }

    const str = await readFile(filepath, { encoding: 'utf8' });

    if (str) {
      return JSON.parse(str);
    }
    return [];
  }

  async write(obj: Record<string, any>) {
    const filepath = this.options.path;
    return await writeFile(filepath, JSON.stringify(obj || [], null, 2));
  }
}
