import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdPessoa = 0, filterIdProfessionalTitle = 0, filterIsActive = true): Promise<number | Error> => {
    try {
        let count
        if (filterIdPessoa === 0 && filterIdProfessionalTitle === 0) {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('isActive', '=', filterIsActive)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPessoa === 0){
            [{ count }] = await Knex(ETableNames.profissional)
                .where('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('isActive', '=', filterIsActive)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessionalTitle === 0) {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('isActive', '=', filterIsActive)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('isActive', '=', filterIsActive)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}