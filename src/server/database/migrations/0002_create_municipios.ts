import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.municipio, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 75).checkLength('<=', 75).index().notNullable()
            table.string('state', 2).checkLength('=', 2).index().notNullable()

            table.comment('Tabela usada para armazenar os municípios com seus respectivos estados.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.municipio}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.municipio)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.municipio}`)
        })
}