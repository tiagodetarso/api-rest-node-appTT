import { ITipoLogradouro } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (tipoLogradouro: Omit<ITipoLogradouro, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.tipoLogradouro)
            .where('type', '=', `${tipoLogradouro.type}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O tipo de logradouro já existe.')
        }

        const [result] = await Knex(ETableNames.tipoLogradouro)
            .insert(tipoLogradouro, ['id'])

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
