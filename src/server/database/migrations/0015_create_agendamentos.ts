import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.agendamento, table => {
            table.bigIncrements('id').primary().index()
            table.double('professionalAvaliation')

            table.bigInteger('idProfessional').index().notNullable()
                .references('id').inTable(ETableNames.profissional)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idClient').index().notNullable()
                .references('id').inTable(ETableNames.cliente)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idHorario').index().notNullable()
                .references('id').inTable(ETableNames.horario)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idStatus').index().notNullable()
                .references('id').inTable(ETableNames.statusAgendamento)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idPaymentStatus').index().notNullable()
                .references('id').inTable(ETableNames.statusPagamento)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os serviços prestados por cada profissional.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.agendamento}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.agendamento)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.agendamento}`)
        })
}