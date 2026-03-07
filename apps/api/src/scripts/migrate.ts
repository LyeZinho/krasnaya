import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@krasnaya/database';

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL || 'postgres://levelbot:levelbot123@localhost:11900/levelbot',
    });
    const db = drizzle(pool, { schema });

    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations complete!');
    await pool.end();
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
