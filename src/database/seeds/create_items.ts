import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lamps', image: 'lamps.svg' },
    { title: 'Batteries', image: 'batteries.svg' },
    { title: 'Paper and Cardboard', image: 'paper-cardboard.svg' },
    { title: 'Electronics', image: 'electronics.svg' },
    { title: 'Organic', image: 'organic.svg' },
    { title: 'Kitchen Oil', image: 'oil.svg' },
  ]);
}
