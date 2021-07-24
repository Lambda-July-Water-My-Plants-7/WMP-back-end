
exports.up = function(knex) {
    return knex.schema.createTable('ipsource', table => {
        table.bigInteger("userID").unsigned().notNullable();
        table.text('username', 128).unique().index().notNullable();
        table.text('password', 255).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
