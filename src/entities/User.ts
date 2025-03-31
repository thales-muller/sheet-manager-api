import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;  // Unique identifier

  @Property()
  username!: string;  // User's name

  @Property({ unique: true })
  email!: string;  // User's unique email

  @Property()
  password!: string;  // Hashed password

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();  // Creation timestamp
}
