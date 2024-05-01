import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index()
            table.string('name', 80).checkLength('<=', 80).index().notNullable()
            table.string('lastName', 80).checkLength('<=', 80).index().notNullable()
            table.string('email', 100).checkLength('<=', 100).index().notNullable()
            table.string('phoneNumber', 16).checkLength('<=', 16).index().notNullable()
            table.string('whatsappNumber', 16).checkLength('<=', 16).index().notNullable()
            table.date('registrationDate').notNullable()
            table.string('password', 200).checkLength('<=', 200).index().notNullable()

            table.bigInteger('idPublicPlace').index().notNullable()
                .references('id').inTable(ETableNames.logradouro)
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