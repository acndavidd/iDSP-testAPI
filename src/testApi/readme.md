# Smart API

## Installation

1. Install grunt-cli `npm install -g grunt-cli`
2. Run 'npm install -g sequelize-pg-generator'
3. Run `npm install` from this directory.
4. Run `typings install` from this directory

## If there is any DB Objects changes
1. CD to folder testApi
2. spgen -d postgres -u postgres -p 123456 -s public -h localhost

-d = DB Name
-u = Username
-p = Password
-s = Schema
-h = Host

## Running ( Execute inside folder testApi)
run: tsc
run: node main.js


### Debug
run: node-debug main.js

## Deploying on Heroku

Run 

    #NOT YET git push heroku `git subtree split --prefix src/api/ master`:master --force

on top level folder