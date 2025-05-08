import { Migration } from '@mikro-orm/migrations';

export class Migration20250508011929 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
