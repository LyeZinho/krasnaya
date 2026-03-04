import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DB_CONNECTION = 'DB_CONNECTION';

@Global()
@Module({
    providers: [
        {
            provide: DB_CONNECTION,
            useFactory: () => {
                const url = process.env.DATABASE_URL || 'postgres://levelbot:levelbot123@localhost:11900/levelbot';
                const pool = new Pool({
                    connectionString: url,
                });
                return drizzle(pool, { schema });
            },
        },
    ],
    exports: [DB_CONNECTION],
})
export class DbModule { }
