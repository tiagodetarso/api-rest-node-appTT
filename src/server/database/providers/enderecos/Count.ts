import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterNumber = 0, filterNeighborhood = ''): Promise<number | Error> => {
    try {
        let count
        if (filterNumber === 0){
            [{ count }] = await Knex(ETableNames.endereco)
                .where( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.endereco)
                .where('number', '=', filterNumber)
                .andWhere( 'neighborhood', 'like', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}