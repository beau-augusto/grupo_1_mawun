require('dotenv').config()

module.exports = {
  "development": {
    "username": "peter",
    "password": "peter",
    "database":  "mawun",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": {
      "socketPath": "/tmp/mysql.sock"
  }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
