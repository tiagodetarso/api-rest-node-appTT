import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdServico = 0, filterIdProfessional = 0, filterLowerPrice = 1, filterHigherPrice = 5000): Promise<number | Error> => {
    try {
        let count
        if (filterIdServico === 0 && filterIdProfessional === 0 && filterLowerPrice === 0 && filterHigherPrice === 0){
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterIdProfessional === 0 && filterLowerPrice === 0) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '<=', filterHigherPrice)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterIdProfessional === 0 && filterHigherPrice === 0) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterLowerPrice === 0 && filterHigherPrice === 0) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterLowerPrice === 0 && filterHigherPrice === 0) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterIdProfessional === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'price', '<=', filterHigherPrice)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterLowerPrice === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '<=', filterHigherPrice)
                .andWhere( 'idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0 && filterHigherPrice === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterLowerPrice === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '<=', filterHigherPrice)
                .andWhere( 'idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterHigherPrice === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        } else if (filterLowerPrice === 0 && filterHigherPrice === 0 ) {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'idProfessional', '>=', filterIdProfessional)
                .andWhere( 'idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdServico === 0){
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'price', '<=', filterHigherPrice)
                .andWhere('idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0){
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'price', '<=', filterHigherPrice)
                .andWhere ('idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        } else if (filterLowerPrice === 0){
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '<=', filterHigherPrice)
                .andWhere ('idServico', '=', filterIdServico)
                .andWhere( 'idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterHigherPrice === 0){
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere ('idServico', '=', filterIdServico)
                .andWhere( 'idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.servicoPrestado)
                .where( 'price', '>=', filterLowerPrice)
                .andWhere( 'price', '<=', filterHigherPrice)
                .andWhere ('idProfessional', '=', filterIdProfessional)
                .andWhere('idServico', '=', filterIdServico)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}