
exports.up = function(knex) {
  return knex.schema.createTable('ipsource', table => {
      table.bigInteger('sourceID').unsigned().notNullable();
      table.text('sourcename', 128).notNullable();
      table.unique('sourceID');
      table.unique('sourcename');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ipsource');
};
