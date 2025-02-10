import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.logradouro, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 75).checkLength('<=', 75).index().notNullable()

            table.bigInteger('idCity').index().notNullable()
                .references('id').inTable(ETableNames.municipio)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os logradouros cadastrados.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.logradouro}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.logradouro)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.logradouro}`)
        })
}