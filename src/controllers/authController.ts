import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { User } from '../entities/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Controller for user login
export async function login(req: Request, res: Response): Promise<void> {
    const orm = req.app.locals.orm as MikroORM;
    const userRepo = orm.em.getRepository(User);
    const { email, password } = req.body;

    // Find user by email
    const user = await userRepo.findOne({ email });
    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
}
