import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdPessoa = 0, filterDateOfBirthLowerLimit = 0, filterDateOfBirthHigherLimit = 0): Promise<number | Error> => {
    try {
        let count
        if (filterIdPessoa === 0 && filterDateOfBirthLowerLimit === 0 && filterDateOfBirthHigherLimit === 0) {
            [{ count }] = await Knex(ETableNames.cliente)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPessoa === 0 && filterDateOfBirthLowerLimit === 0) {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPessoa === 0 && filterDateOfBirthHigherLimit === 0) {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .count<[{ count: number}]>('* as count')
        } else if (filterDateOfBirthLowerLimit === 0 && filterDateOfBirthHigherLimit === 0){
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPessoa === 0){
            [{ count }] = await Knex(ETableNames.cliente)
                .where('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .count<[{ count: number}]>('* as count')
        } else if (filterDateOfBirthLowerLimit === 0){
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .count<[{ count: number}]>('* as count')
        } else if (filterDateOfBirthHigherLimit === 0){
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '>=', filterDateOfBirthLowerLimit)
                .andWhere('dateOfBirth', '<=', filterDateOfBirthHigherLimit)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}