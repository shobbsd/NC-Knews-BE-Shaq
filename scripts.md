1. "setup:dbs" - CAN USE JUST ONCE PER MACHINE!
2. "migrate:make" - creates a migration file. THE ORDER THESE ARE CREATED MATTERS
3. "migrate:latest" - runs all `up` fns, in the migration files in the correct order
4. "migrate:rollback" - runs all `down` fns in the migration files - thereby dropping all data
5. "seed:make" - Creates a seed file.
6. "seed:run" - (rollback -> latest) inserts data
7. "dev" - hosts the server, default port = 9090
