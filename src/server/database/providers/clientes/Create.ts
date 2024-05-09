import { ICliente } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (cliente: Omit<ICliente, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.cliente)
            .where('idPessoa', '=', cliente.idPessoa)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Esta pessoa já esta cadastrada como cliente.')
        }

        const [result] = await Knex(ETableNames.cliente)
            .insert(cliente, ['id'])

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
