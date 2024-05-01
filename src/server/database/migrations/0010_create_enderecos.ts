import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.endereco, table => {
            table.bigIncrements('id').primary().index()
            table.integer('number').checkPositive().notNullable()
            table.string('neighborhood', 75).checkLength('<=', 75).index().notNullable()

            table.bigInteger('idPublicPlace').index().notNullable()
                .references('id').inTable(ETableNames.logradouro)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os logradouros cadastrados.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.endereco}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.endereco)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.endereco}`)
        })
}