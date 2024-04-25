import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export const seed = async(knex: Knex) => {

    const [{count}] = await knex(ETableNames.statusPagamento).count<[{count: number}]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0) return
    
    const statusToInsert = statusPagamento.map(status => ({status: status}))
    await knex(ETableNames.statusPagamento).insert(statusToInsert)
}

const statusPagamento = [
    'Atendimento ainda não foi realizado',
    'Cliente indica o pagamento antecipado',
    'Pago (profissional confirma o pagamento antecipado)',
    'Cliente indica o pagamento',
    'Pago (profissional confirma o pagamento)',
    'Profissional indica a falta de pagamento',
    'Pago pelo aplicativo'
]