import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.servicoPrestado, table => {
            table.bigIncrements('id').primary().index()
            table.string('specificDescription', 300).checkLength('<=', 300).index().notNullable()
            table.double('price').notNullable()

            table.bigInteger('idServico').index().notNullable()
                .references('id').inTable(ETableNames.servico)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idProfessional').index().notNullable()
                .references('id').inTable(ETableNames.profissional)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os serviços prestados por cada profissional.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.servicoPrestado}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.servicoPrestado)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.servicoPrestado}`)
        })
}