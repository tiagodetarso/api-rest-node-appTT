import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.horario, table => {
            table.bigIncrements('id').primary().index()
            table.date('schedulingTime').notNullable()
            table.boolean('isAvaiable').notNullable()

            table.bigInteger('idProfessional').index().notNullable()
                .references('id').inTable(ETableNames.profissional)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os horários de cada profissional.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.horario}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.horario)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.horario}`)
        })
}