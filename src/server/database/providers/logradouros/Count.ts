import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterName = '', filterIdCity=0): Promise<number | Error> => {
    try {
        let count
        if (filterIdCity == 0) {
            [{ count }] = await Knex(ETableNames.logradouro)
                .where('name', 'like', `%${filterName}%`)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.logradouro)
                .where('name', 'like', `%${filterName}%`)
                .andWhere('idCity', '=', filterIdCity )
                .count<[{ count: number}]>('* as count')
        }

        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}