
module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "mawun",
    "host": "127.0.0.1",
    "dialect": "mysql",
   // "dialectOptions": { "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock" }
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
