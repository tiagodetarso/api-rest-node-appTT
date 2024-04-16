import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IServico } from '../../models'

export const getAll = async (page: number, limit: number, filterName: string, id=0): Promise<IServico[] | Error> => {
    try {
        const result = await Knex(ETableNames.servico)
            .select('*')
            .where ('name', 'like', `%${filterName}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.servico)
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