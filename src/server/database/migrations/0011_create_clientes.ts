import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.cliente, table => {
            table.bigIncrements('id').primary().index()
            table.string('genderId', 80).checkLength('<=', 80).index().notNullable()
            table.date('dateOfBirth').notNullable()

            table.bigInteger('idPessoa').index().notNullable()
                .references('id').inTable(ETableNames.pessoa)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os clientes cadastrados.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.cliente}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.cliente)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.cliente}`)
        })
}