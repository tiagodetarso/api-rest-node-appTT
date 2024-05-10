import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.profissional, table => {
            table.bigIncrements('id').primary().index()
            table.boolean('isActive').notNullable()

            table.bigInteger('idPessoa').index().notNullable()
                .references('id').inTable(ETableNames.pessoa)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('idProfessionalTitle').index().notNullable()
                .references('id').inTable(ETableNames.tituloProfissional)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            table.bigInteger('serviceAddress').index().notNullable()
                .references('id').inTable(ETableNames.endereco)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar os profissionais cadastrados.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.profissional}`)
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.profissional)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.profissional}`)
        })
}