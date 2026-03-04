import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
export declare const rbacPermissions: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "rbac_permissions";
    schema: undefined;
    columns: {
        roleId: import("drizzle-orm/pg-core").PgColumn<{
            name: "role_id";
            tableName: "rbac_permissions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        action: import("drizzle-orm/pg-core").PgColumn<{
            name: "action";
            tableName: "rbac_permissions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isDenied: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_denied";
            tableName: "rbac_permissions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare class RbacGuardService {
    private readonly db;
    constructor(db: NodePgDatabase<typeof schema>);
    canAccess(roleId: string, action: string): Promise<boolean>;
}
