# IDSP Data Access

## Installation

1. Install grunt-cli `npm install -g grunt-cli`
2. Run `npm install` from this directory.
3. Run `typings install` from this directory
4. Copy `config/config.json.example` to `config/config.json`
5. Copy `config/migrate.json.example` to `config/migrate.json`

## Running
run: tsc
run: node main.js


##Notes
To map database tables into models call /service/refreshmodel

## Sequelize Environment and Configuration
Run Sequelize with the following parameters:
`sequelize <options> --env sql-dev  --config config/migrate.json`

### Debug
run: node-debug src/rest/main.js

## Deploying on 

Run 

