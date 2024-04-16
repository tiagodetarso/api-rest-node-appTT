import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterTitle = '', filterSubtitle = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.tipoLogradouro)
            .where('title', 'like', `%${filterTitle}%`)
            .andWhere('subtitle', 'like', `%${filterSubtitle}%`)
            .count<[{ count: number}]>('* as count')
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}