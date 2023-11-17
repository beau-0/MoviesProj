
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        table.integer("movie_id").references("movie_id").inTable("movies");
        table.integer("critic_id").references("critic_id").inTable("critics");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
