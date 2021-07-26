
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.bigInteger("userID").unsigned().notNullable();
        table.text('username', 128).unique().notNullable();
        table.text('phoneNumber', 128).unique().notNullable();
        table.text('password', 255).notNullable();
    }).createTable('plants', table => {
        table.bigInteger('plantID').unique().notNullable();
        table.bigInteger('speciesID')
        table.bigInteger('h2oInterval').notNullable();
        table.text('h2oAmount', 128).notNullable();
        table.text('nickname', 128);
        table.bigInteger("userID")
            .references('userID')
            .inTable('users')
            .onDelete('CASCADE');
        
    })
};

exports.down = function(knex) {
        return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
