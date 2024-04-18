import { IStatusPagamento } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (statusPagamento: Omit<IStatusPagamento, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.statusPagamento)
            .where('status', '=', `${statusPagamento.status}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O status de pagamento já existe no sistema.')
        }

        const [result] = await Knex(ETableNames.statusPagamento)
            .insert(statusPagamento, ['id'])

        if (typeof result === 'object') {
            return result.id
        } else if ( typeof result === 'number' ){
            return result
        }

        return new Error ('Erro ao cadastrar registro')

    } catch (error) {
        return new Error('Erro ao cadastrar o registro')
    }
}
