import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdPessoa = 0, filterDateOfBirth = 0): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.tipoLogradouro)
            .where('idPessoa', '=', filterIdPessoa)
            .andWhere('dateOfBirth', '=', filterDateOfBirth)
            .count<[{ count: number}]>('* as count')
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}