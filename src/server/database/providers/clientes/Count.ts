import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdPessoa = 0, filterDateOfBirth = new Date(1983,6,16)): Promise<number | Error> => {
    try {
        let count
        if (filterIdPessoa === 0 && filterDateOfBirth === new Date(1983,6,16)) {
            [{ count }] = await Knex(ETableNames.cliente)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPessoa === 0) {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('dateOfBirth', '=', filterDateOfBirth)
                .count<[{ count: number}]>('* as count')
        } else if (filterDateOfBirth === new Date(1983,6,16)) {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.cliente)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('dateOfBirth', '=', filterDateOfBirth)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}