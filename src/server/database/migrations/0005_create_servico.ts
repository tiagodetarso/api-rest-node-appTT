import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.servico, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 80).checkLength('<=', 80).index().notNullable()
            table.string('genericDescription', 300).checkLength('<=', 300).index().notNullable()

            table.comment('Tabela usada para armazenar os títulos profissionais.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.servico}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.servico)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.servico}`)
        })
}