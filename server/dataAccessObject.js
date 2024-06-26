import sqlite3 from 'sqlite3';
import { existsSync, closeSync, openSync } from 'fs';

const { Database } = sqlite3;

class DataAccessObject {
  constructor(dbPath) {
    if (!existsSync(dbPath)) {
      closeSync(openSync(dbPath, 'w'));
    }
    this.db = new Database(dbPath, error => {
      if (error) {
        console.log('Could not connect to database', error);
      } else {
        console.log('Connected to database');
      }
    });
  }

  printError(sql, error) {
    console.log(`Error running sql ${sql}\n${error}`);
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(error) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function(error, result) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function(error, rows) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default DataAccessObject;