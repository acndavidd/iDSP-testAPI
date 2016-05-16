# IDSP Data Access

## Installation

1. Install grunt-cli `npm install -g grunt-cli`
2. Run `npm install` from this directory.
3. Run `npm install -g typescript`
4. Run `typings install` from this directory
5. Copy `config/config.json.example` to `config/config.json`
6. Copy `config/migrate.json.example` to `config/migrate.json`

## Running
run: tsc
run: node main.js


##Notes
To map database tables into models call /service/refreshmodel

## Sequelize Environment and Configuration
Run Sequelize with the following parameters:
`sequelize <options> --env sql-dev  --config config/migrate.json`

### Migrating Database
`sequelize db:migrate --env sql-dev --config config/migrate.json`

### Reverting All Migration
`sequelize db:migrate:undo:all --env sql-dev --config config/migrate.json`

### Seed Database
`sequelize db:seed:all --env sql-dev --config config/migrate.json`

### Undoing Seed on Database
`sequelize db:seed:undo:all --env sql-dev --config config/migrate.json`

### Debug
run: node-debug src/rest/main.js

## Deploying on 

Run 

