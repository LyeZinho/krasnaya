import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@krasnaya/database';

export const DB_CONNECTION = 'DB_CONNECTION';

@Global()
@Module({
    providers: [
        {
            provide: DB_CONNECTION,
            useFactory: () => {
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL || 'postgres://levelbot:levelbot123@localhost:11900/levelbot',
                });
                return drizzle(pool, { schema });
            },
        },
    ],
    exports: [DB_CONNECTION],
})
export class DbModule { }
