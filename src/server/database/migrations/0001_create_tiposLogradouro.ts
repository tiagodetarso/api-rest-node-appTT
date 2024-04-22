import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tipoLogradouro, table => {
            table.bigIncrements('id').primary().index()
            table.string('type', 50).checkLength('<=', 50).index().notNullable()

            table.comment('Tabela usada para armazenar os tipos de logradouro.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tipoLogradouro}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tipoLogradouro)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.tipoLogradouro}`)
        })
}
