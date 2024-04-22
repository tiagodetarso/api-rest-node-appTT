import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tituloProfissional, table => {
            table.bigIncrements('id').primary().index()
            table.string('title', 100).checkLength('<=', 100).index().notNullable()
            table.string('subtitle', 300).checkLength('<=', 300).index().notNullable()

            table.comment('Tabela usada para armazenar os títulos profissionais.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tituloProfissional}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tituloProfissional)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.tituloProfissional}`)
        })
}