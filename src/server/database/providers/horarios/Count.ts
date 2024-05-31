import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdProfessional = 0, filterSchedulingTime = 0, filterIsAvaiable = true): Promise<number | Error> => {
    try {
        let count
        if (filterIdProfessional === 0 && filterSchedulingTime === 0) {
            [{ count }] = await Knex(ETableNames.horario)
                .where('isAvaiable', '=', filterIsAvaiable)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0) {
            [{ count }] = await Knex(ETableNames.horario)
                .where('isAvaiable', '=', filterIsAvaiable)
                .andWhere('schedulingTime', '>=', filterSchedulingTime)
                .count<[{ count: number}]>('* as count')
        } else if (filterSchedulingTime === 0) {
            [{ count }] = await Knex(ETableNames.horario)
                .where('isAvaiable', '=', filterIsAvaiable)
                .andWhere('idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.horario)
                .where('isAvaiable', '>=', filterIsAvaiable)
                .andWhere('idProfessional', '=', filterIdProfessional)
                .andWhere('schedulingTime', '>=', filterSchedulingTime)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}