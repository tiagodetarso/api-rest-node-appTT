import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 80).checkLength('<=', 80).index().notNullable()
            table.string('lastName', 80).checkLength('<=', 80).index().notNullable()
            table.string('email').index().notNullable()
            table.string('phoneNumber', 16).checkLength('<=', 16).index()
            table.string('whatsappNumber', 16).checkLength('<=', 16).index().notNullable()
            table.integer('registrationDate').checkPositive().notNullable()
            table.string('password', 20).checkLength('<=', 20).index().notNullable()

            table.bigInteger('idAdress').index().notNullable()
                .references('id').inTable(ETableNames.endereco)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar as pessoas cadastradas no sistema.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`)
        })
}