import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdPessoa = 0, filterIdProfessionalTitle = 0): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.profissional)
            .where('idPessoa', '=', filterIdPessoa)
            .andWhere('idProfessionalTitle', '=', filterIdProfessionalTitle)
            .count<[{ count: number}]>('* as count')
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}