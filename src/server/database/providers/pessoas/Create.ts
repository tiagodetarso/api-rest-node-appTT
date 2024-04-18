import { IPessoa } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.pessoa)
            .where('email', '=', `${pessoa.email}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Uma pessoa já esta cadastrada com esse endereço de e-mail.')
        }

        const [result] = await Knex(ETableNames.pessoa)
            .insert(pessoa, ['id'])

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
