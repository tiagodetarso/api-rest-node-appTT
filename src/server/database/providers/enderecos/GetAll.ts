import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IEndereco } from '../../models'

export const getAll = async (page: number, limit: number, filterIdCity: number,  filterNumber: number, filterNeighborhood: string, id=0): Promise<IEndereco[] | Error> => {
    try {
        let result
        if (filterIdCity == 0 && filterNumber == 0) {

            result = await Knex(ETableNames.endereco)
                .select('*')
                .where ( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterNumber == 0) {
            result = await Knex(ETableNames.endereco)
                .select('*')
                .where ('idCity', '=', filterIdCity)
                .andWhere ( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdCity == 0) {
            result = await Knex(ETableNames.endereco)
                .select('*')
                .where ('number', '=', filterNumber)
                .andWhere ( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .offset((page - 1) * limit)
                .limit(limit)
        } else {
            result = await Knex(ETableNames.endereco)
                .select('*')
                .where ('idCity', '=', filterIdCity)
                .andWhere ('number', '=', filterNumber)
                .andWhere ( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .offset((page - 1) * limit)
                .limit(limit)
        }

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.endereco)
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