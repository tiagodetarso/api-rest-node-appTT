import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdCity = 0, filterNumber = 0, filterNeighborhood = ''): Promise<number | Error> => {
    try {
        let count
        if (filterIdCity == 0 && filterNumber == 0 ) {
            [{ count }] = await Knex(ETableNames.endereco)
                .where( 'neighborhood', '=', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdCity == 0){
            [{ count }] = await Knex(ETableNames.endereco)
                .where('number', 'like', filterNumber)
                .andWhere( 'neighborhood', '=', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        } else if (filterNumber == 0){
            [{ count }] = await Knex(ETableNames.endereco)
                .where ('idCity', '=', filterIdCity)
                .andWhere( 'neighborhood', '=', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.endereco)
                .where ('idCity', '=', filterIdCity)
                .andWhere('number', 'like', filterNumber)
                .andWhere( 'neighborhood', '=', `%${filterNeighborhood}%`)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}