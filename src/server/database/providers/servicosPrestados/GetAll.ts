import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IServicoPrestado } from '../../models'

export const getAll = async (page: number, limit: number, filterIdServico: number,  filterIdProfessional: number, filterLowerPrice: number, filterHigherPrice: number, id=0): Promise<IServicoPrestado[] | Error> => {
    try {
        let result
        if (filterIdServico== 0 && filterIdProfessional == 0) {

            result = await Knex(ETableNames.servicoPrestado)
                .select('*')
                .where('price', '>=', filterLowerPrice)
                .andWhere('price', '<=', filterHigherPrice)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdServico == 0) {
            result = await Knex(ETableNames.servicoPrestado)
                .select('*')
                .where('price', '>=', filterLowerPrice)
                .andWhere('price', '<=', filterHigherPrice)
                .andWhere ('idProfessional', '=', filterIdProfessional)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdProfessional == 0) {
            result = await Knex(ETableNames.servicoPrestado)
                .select('*')
                .where('price', '>=', filterLowerPrice)
                .andWhere('price', '<=', filterHigherPrice)
                .andWhere ('idServico', '=', filterIdServico)
                .offset((page - 1) * limit)
                .limit(limit)
        } else {
            result = await Knex(ETableNames.servicoPrestado)
                .select('*')
                .where('price', '>=', filterLowerPrice)
                .andWhere('price', '<=', filterHigherPrice)
                .andWhere ('idProfessional', '=', filterIdProfessional)
                .andWhere ('idServico', '=', filterIdServico)
                .offset((page - 1) * limit)
                .limit(limit)
        }

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.servicoPrestado)
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