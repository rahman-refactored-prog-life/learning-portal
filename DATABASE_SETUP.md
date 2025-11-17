# PostgreSQL Database Setup for Learning Portal

## Database Configuration

**Database Name**: `learning-portal`
**Username**: `learning_portal_user` (or `postgres`)
**Password**: `learning_portal_pass` (you can change this)
**Host**: `localhost`
**Port**: `5432` (default PostgreSQL port)

---

## Option 1: Setup Using pgAdmin 4 (GUI - Recommended)

### Step 1: Open pgAdmin 4
1. Open `/Applications/PostgreSQL 18/pgAdmin 4.app`
2. Enter your master password (set during PostgreSQL installation)

### Step 2: Connect to PostgreSQL Server
1. In the left sidebar, expand "Servers"
2. Click on "PostgreSQL 18"
3. Enter your PostgreSQL password if prompted

### Step 3: Create Database
1. Right-click on "Databases"
2. Select "Create" → "Database..."
3. In the "General" tab:
   - Database name: `learning_portal`
   - Owner: postgres (or your username)
4. Click "Save"

### Step 4: Create User (Optional - for security)
1. Right-click on "Login/Group Roles"
2. Select "Create" → "Login/Group Role..."
3. In the "General" tab:
   - Name: `learning_portal_user`
4. In the "Definition" tab:
   - Password: `learning_portal_pass`
5. In the "Privileges" tab:
   - Enable: "Can login?"
6. Click "Save"

### Step 5: Grant Permissions
1. Right-click on the `learning_portal` database
2. Select "Properties"
3. Go to "Security" tab
4. Add `learning_portal_user` with all privileges
5. Click "Save"

---

## Option 2: Setup Using SQL Shell (Command Line)

### Step 1: Open SQL Shell
1. Open `/Applications/PostgreSQL 18/SQL Shell (psql).app`
2. Press Enter for default values (Server, Database, Port, Username)
3. Enter your PostgreSQL password

### Step 2: Run SQL Commands

```sql
-- Create database
CREATE DATABASE learning_portal;

-- Create user (optional)
CREATE USER learning_portal_user WITH PASSWORD 'learning_portal_pass';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE learning_portal TO learning_portal_user;

-- Connect to the new database
\c learning_portal

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO learning_portal_user;

-- Exit
\q
```

---

## Option 3: Quick Setup Script

Save this as `setup-database.sql` and run it:

```sql
-- Create database
CREATE DATABASE learning_portal
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Create user
CREATE USER learning_portal_user WITH
    LOGIN
    PASSWORD 'learning_portal_pass'
    CONNECTION LIMIT -1;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE learning_portal TO learning_portal_user;

-- Connect to database
\c learning_portal

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO learning_portal_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO learning_portal_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO learning_portal_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO learning_portal_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO learning_portal_user;
```

---

## Verify Database Setup

### Using pgAdmin:
1. Refresh the database list
2. You should see `learning_portal` database
3. Expand it to see "Schemas" → "public"

### Using SQL Shell:
```sql
-- List all databases
\l

-- Connect to learning_portal
\c learning_portal

-- List all tables (should be empty for now)
\dt
```

---

## Connection Details for Spring Boot

Once the database is set up, use these connection details in your Spring Boot application:

```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/learning-portal
spring.datasource.username=postgres
spring.datasource.password=your_password_here
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate settings
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## Test Connection

After setting up, we'll create a simple Java test to verify the connection works.

---

## Troubleshooting

### If PostgreSQL is not running:
1. Open pgAdmin 4
2. Check if the server is connected
3. Or restart PostgreSQL service

### If you forgot your PostgreSQL password:
1. You'll need to reset it using PostgreSQL configuration
2. Or reinstall PostgreSQL

### If port 5432 is already in use:
```bash
# Check what's using port 5432
lsof -i :5432
```

---

## Next Steps

After completing the database setup:
1. ✅ Verify the database exists
2. ✅ Note down your connection details
3. ✅ We'll create a Spring Boot project to test the connection
4. ✅ Start Phase 1 implementation

---

**Which option would you like to use?**
- Option 1: pgAdmin 4 (GUI - easiest)
- Option 2: SQL Shell (command line)
- Option 3: SQL script

Let me know when you've completed the setup, and I'll help you test the connection!
