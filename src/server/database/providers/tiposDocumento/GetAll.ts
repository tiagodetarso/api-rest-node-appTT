import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ITipoDocumento } from '../../models'

export const getAll = async (page: number, limit: number, filter: string, id=0): Promise<ITipoDocumento[] | Error> => {
    try {
        const result = await Knex(ETableNames.tipoDocumento)
            .select('*')
            .where ('type', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.tipoDocumento)
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