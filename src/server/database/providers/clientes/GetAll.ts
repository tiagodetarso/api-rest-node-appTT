import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICliente } from '../../models'

export const getAll = async (page: number, limit: number, filterIdPessoa: number, filterDateOfBirthLowerLimit: number, filterDateOfBirthHigherLimit: number, id=0): Promise<ICliente[] | Error> => {
    try {
        let result
        if (filterIdPessoa === 0 && filterDateOfBirthLowerLimit === 0 && filterDateOfBirthHigherLimit === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0 && filterDateOfBirthLowerLimit === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0 && filterDateOfBirthHigherLimit === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterDateOfBirthHigherLimit === 0 && filterDateOfBirthLowerLimit === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('idPessoa', '=', filterIdPessoa)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterDateOfBirthLowerLimit === 0){
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterDateOfBirthHigherLimit === 0) {
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        } else {
            result = await Knex(ETableNames.cliente)
                .select('*')
                .where ('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .offset((page - 1) * limit)
                .limit(limit)
        }

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