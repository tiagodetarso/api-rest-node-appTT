import { ILogradouro } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (logradouro: Omit<ILogradouro, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.logradouro)
            .where('name', '=', `${logradouro.name}`)
            .andWhere('idCity', '=', `${logradouro.idCity}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Este logradouro já foi cadastrado anteriormente.')
        }

        const [result] = await Knex(ETableNames.logradouro)
            .insert(logradouro, ['id'])

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