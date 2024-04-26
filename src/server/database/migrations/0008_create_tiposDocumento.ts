import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tipoDocumento, table => {
            table.bigIncrements('id').primary().index()
            table.string('documentName', 50).checkLength('<=', 50).index().notNullable()

            table.comment('Tabela usada para armazenar os títulos profissionais.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tipoDocumento}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tipoDocumento)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.tipoDocumento}`)
        })
}