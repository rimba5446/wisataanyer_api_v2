import { Request, Response } from "express";
import Users from "../models/users.model";
import usersRepository from "../repositories/users.repository";

export default class UsersController {
  async create(req: Request, res: Response) {
    // if (!req.body.title) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }

    try {
      const users: Users= req.body;
      const savedUsers= await usersRepository.save(users);

      res.status(201).send(savedUsers);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving Users"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const username = typeof req.query.username === "string" ? req.query.username : "";

    try {
      const users = await usersRepository.retrieveAll({ username: username });

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving username."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const users= await usersRepository.retrieveById(id);

      if (users) res.status(200).send(users);
      else
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Users with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let users: Users = req.body;
    users.id = parseInt(req.params.id);

    try {
      const num = await usersRepository.update(users);

      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${users.id}. Maybe Users was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Users with id=${users.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await usersRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Users was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Users with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await usersRepository.deleteAll();

      res.send({ message: `${num} Users were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials."
      });
    }
  }

  async findAllId(req: Request, res: Response) {
    try {
      const users = await usersRepository.retrieveAll({  });

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving ."
      });
    }
  }
}
