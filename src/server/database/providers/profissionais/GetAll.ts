import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IProfissional } from '../../models'

export const getAll = async (page: number, limit: number, filterIdPessoa: number, filterIdProfessionalTitle: number, filterIsActive: boolean, id=0): Promise<IProfissional[] | Error> => {
    try {
        const result = await Knex(ETableNames.profissional)
            .select('*')
            .where ('idPessoa', '=', filterIdPessoa)
            .andWhere('idProfessionalTitle', '=', filterIdProfessionalTitle)
            .andWhere('isActive', '=', filterIsActive)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.profissional)
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