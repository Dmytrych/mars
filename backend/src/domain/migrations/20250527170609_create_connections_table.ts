import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("connections", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("clientId").notNullable();
    table.uuid("trainerId").notNullable();
    table.enum("status", ["pending", "accepted", "rejected"]).notNullable();
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.unique(["clientId", "trainerId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("connections");
}
