import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export const seed = async(knex: Knex) => {

    const [{count}] = await knex(ETableNames.statusAgendamento).count<[{count: number}]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0) return
    
    const statusToInsert = statusAgendamento.map(status => ({status: status}))
    await knex(ETableNames.statusAgendamento).insert(statusToInsert)
}

const statusAgendamento = [
    'Agendado solicitado',
    'Agendamento cancelado pelo profissional',
    'Agendamento confirmado pelo profissional',
    'Agendamento cancelado pelo cliente',
    'Alteração de horário solicitada pelo profissional',
    'Alteração de horário solicitada pelo cliente',
    'Alteração de horário negada pelo cliente',
    'Alteração de horário aceita pelo cliente',
    'Alteração de horário negada pelo profissional',
    'Alteração de horário aceita pelo profissional'
]