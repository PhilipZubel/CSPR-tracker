import * as SQLite from "expo-sqlite";
import id from "./id";

const db = SQLite.openDatabase("database.db", "1.0", "test", 2 * 1024 * 1024);

export default {
  fetch() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM owes ORDER BY name",
          [],
          (_, { rows: { _array } }) => resolve(_array),
          (_, { message }) => reject(message)
        );
      });
    });
  },
  add(name) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO owes(id, name) VALUES(?,?)",
          [id(), name],
          (_, result) => resolve(true),
          (_, { message }) => reject(message)
        );
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM owes WHERE id = ?",
          [id],
          (_, result) => resolve(true),
          (_, { message }) => reject(message)
        );
      });
    });
  },

  create_table() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS owes(id integer primary key not null, name text)",
          [],
          (_, result) => resolve(true),
          (_, { message }) => reject(message)
        );
      });
    });
  },
};