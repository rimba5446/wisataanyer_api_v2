import { OkPacket } from "mysql2";
import connection from "../db";

import Users from "../models/users.model";

interface IUsersRepository {
  save(users : Users): Promise<Users>;
  retrieveAll(searchParams: {username: string}): Promise<Users[]>;
  retrieveById(usersId: number): Promise<Users | undefined>;
  update(users : Users): Promise<number>;
  delete(usersId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UsersRepository implements IUsersRepository {
  save(users: Users): Promise<Users> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO users (avatar, username, password, email, address, role) VALUES(?,?,?,?,?,?)",
        [ users.avatar, users.username, users.password, users.email, users.address, users.role],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((users) => resolve(users!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {username?: string}): Promise<Users[]> {
    let query: string = "SELECT * FROM users";
    let condition: string = "";

    if (searchParams?.username)
      condition += `LOWER(username) LIKE '%${searchParams.username}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Users[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(usersId: number): Promise<Users> {
    return new Promise((resolve, reject) => {
      connection.query<Users[]>(
        "SELECT * FROM users WHERE id = ?",
        [usersId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(users: Users): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
        [users.title, users.description, users.published, users.id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(usersId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM users WHERE id = ?",
        [usersId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new UsersRepository();
