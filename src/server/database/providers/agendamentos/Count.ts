import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdClient = 0, filterIdHorario = 0, filterStatus: '', filterPaymentStatus: ''): Promise<number | Error> => {
    try {
        let count
        if (filterIdClient === 0 && filterIdHorario === 0) {
            [{ count }] = await Knex(ETableNames.pessoa)
                .where('status', 'like', `%${filterStatus}%`)
                .andWhere('paymentStatus', 'like', `%${filterPaymentStatus}%`)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0){
            [{ count }] = await Knex(ETableNames.pessoa)
                .where('status', 'like', `%${filterStatus}%`)
                .andWhere('paymentStatus', 'like', `%${filterPaymentStatus}%`)
                .andWhere('idHorario', '=', filterIdHorario)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdHorario === 0){
            [{ count }] = await Knex(ETableNames.pessoa)
                .where('status', 'like', `%${filterStatus}%`)
                .andWhere('paymentStatus', 'like', `%${filterPaymentStatus}%`)
                .andWhere('idClient', '=', filterIdClient)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.pessoa)
                .where('status', 'like', `%${filterStatus}%`)
                .andWhere('paymentStatus', 'like', `%${filterPaymentStatus}%`)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idClient', '=', filterIdClient)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}