import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ITituloProfissional } from '../../models'

export const getAll = async (page: number, limit: number, filterTitle: string, filterSubtitle: string, id=0): Promise<ITituloProfissional[] | Error> => {
    try {
        const result = await Knex(ETableNames.tituloProfissional)
            .select('*')
            .where ('title', 'like', `%${filterTitle}%`)
            .andWhere('subtitle', 'like', `%${filterSubtitle}%` )
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.tituloProfissional)
                .select('*')
                .where('id', '=', id)
                .first()
            
            if (resultById) return [...result, resultById]
        }

        return result

    } catch (error) {
        return new Error('Erro ao buscar registros')
    }
}