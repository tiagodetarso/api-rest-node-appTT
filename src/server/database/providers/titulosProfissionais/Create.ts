import { ITituloProfissional } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (tituloProfissional: Omit<ITituloProfissional, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.tituloProfissional)
            .where('title', '=', `${tituloProfissional.title}`)
            .andWhere('subtitle', '=', `${tituloProfissional.subtitle}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O título profissional já está cadastrado no sistema.')
        }

        const [result] = await Knex(ETableNames.tituloProfissional)
            .insert(tituloProfissional, ['id'])

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
