import { Request, Response } from 'express';
import { User } from '../entities/User.js';
import { MikroORM } from '@mikro-orm/core';
import bcrypt from 'bcrypt';

// Controller to create a new user
export async function createUser(req: Request, res: Response) {
  const orm = req.app.locals.orm as MikroORM;
  const { username, email, password } = req.body;
  const userRepo = orm.em.getRepository(User);

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepo.create({ username, email, password: hashedPassword, createdAt: new Date() });
  await orm.em.persistAndFlush(user);

  res.status(201).json(user);
}

// Controller to get all users (protected)
export async function getUsers(req: Request, res: Response) {
  const orm = req.app.locals.orm as MikroORM;
  const userRepo = orm.em.getRepository(User);
  const users = await userRepo.findAll();
  res.json(users);
}

// Controller to get a single user by id (protected)
export async function getUserById(req: Request, res: Response) {
  const orm = req.app.locals.orm as MikroORM;
  const userRepo = orm.em.getRepository(User);
  const user = await userRepo.findOne({ id: parseInt(req.params.id) });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}

// Controller to update a user by id (protected)
export async function updateUser(req: Request, res: Response) {
  const orm = req.app.locals.orm as MikroORM;
  const userRepo = orm.em.getRepository(User);
  const user = await userRepo.findOne({ id: parseInt(req.params.id) });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const { username, email, password } = req.body;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  
  await orm.em.persistAndFlush(user);
  res.json(user);
}

// Controller to delete a user by id (protected)
export async function deleteUser(req: Request, res: Response) {
  const orm = req.app.locals.orm as MikroORM;
  const userRepo = orm.em.getRepository(User);
  const user = await userRepo.findOne({ id: parseInt(req.params.id) });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  
  await orm.em.removeAndFlush(user);
  res.json({ message: 'User deleted' });
}
