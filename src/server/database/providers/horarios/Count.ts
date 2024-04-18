import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdProfessional = 0, filterSchedulingTime = new Date(1983,6,16), filterIsAvaiable = true): Promise<number | Error> => {
    try {
        let count
        if (filterIdProfessional === 0 && filterSchedulingTime === new Date(1983,6,16)) {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('isAvaiable', '=', filterIsAvaiable)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0) {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('isAvaiable', '=', filterIsAvaiable)
                .andWhere('dateOfBirth', '=', filterSchedulingTime)
                .count<[{ count: number}]>('* as count')
        } else if (filterSchedulingTime === new Date(1983,6,16)) {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('isAvaiable', '=', filterIsAvaiable)
                .andWhere('idPessoa', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.profissional)
                .where('isAvaiable', '=', filterIsAvaiable)
                .andWhere('idPessoa', '=', filterIdProfessional)
                .andWhere('dateOfBirth', '=', filterSchedulingTime)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}