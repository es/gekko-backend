-- You should change user and password
CREATE USER user_name WITH PASSWORD 'user_password';
GRANT ALL PRIVILEGES ON DATABASE 'db_name' to user_name;
ALTER ROLE user_name CREATEROLE CREATEDB REPLICATION SUPERUSER;
\q