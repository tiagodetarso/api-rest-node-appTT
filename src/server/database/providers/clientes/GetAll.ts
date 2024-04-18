import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICliente } from '../../models'

export const getAll = async (page: number, limit: number, filterIdPessoa: number, filterDateOfBirth: Date, id=0): Promise<ICliente[] | Error> => {
    try {
        const result = await Knex(ETableNames.cliente)
            .select('*')
            .where ('idPessoa', '=', filterIdPessoa)
            .andWhere('dateOfBirth', '=', filterDateOfBirth)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.cliente)
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