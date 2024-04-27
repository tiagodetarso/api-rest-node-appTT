import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IMunicipio } from '../../models'

export const getAll = async (page: number, limit: number, filterName: string, filterState: string, id=0): Promise<IMunicipio[] | Error> => {
    try {
        const result = await Knex(ETableNames.municipio)
            .select('*')
            .where ('name', 'like', `%${filterName}%`)
            .andWhere ('state', 'like', `%${filterState}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.municipio)
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