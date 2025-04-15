import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.string("name").notNullable(); // User's name
    table.string("email").notNullable().unique(); // User's email, must be unique
    table.string("password").notNullable(); // User's hashed password
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Creation timestamp
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Update timestamp
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
