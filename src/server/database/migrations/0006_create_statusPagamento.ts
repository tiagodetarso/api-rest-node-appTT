import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.statusPagamento, table => {
            table.bigIncrements('id').primary().index()
            table.string('status', 75).checkLength('<=', 75).index().notNullable()

            table.comment('Tabela usada para armazenar os status de pagamento.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.statusPagamento}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.statusPagamento)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.statusPagamento}`)
        })
}