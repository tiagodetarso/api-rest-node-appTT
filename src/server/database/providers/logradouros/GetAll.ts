import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ILogradouro } from '../../models'

export const getAll = async (page: number, limit: number, filterName: string, filterIdCity: number, id=0): Promise<ILogradouro[] | Error> => {
    try {
        const result = await Knex(ETableNames.logradouro)
            .select('*')
            .where('idCity', '=', `${filterIdCity}` ) 
            .andWhere ('name', 'like', `%${filterName}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.logradouro)
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