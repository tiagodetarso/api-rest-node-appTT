import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.statusAgendamento, table => {
            table.bigIncrements('id').primary().index()
            table.string('status', 100).checkLength('<=', 100).index().notNullable()

            table.comment('Tabela usada para armazenar os status de agendamento.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.statusAgendamento}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.statusAgendamento)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.statusAgendamento}`)
        })
}