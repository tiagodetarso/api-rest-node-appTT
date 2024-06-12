import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterIdProfessional = 0, filterIdClient = 0, filterIdHorario = 0, filterIdStatus = 0, filterIdPaymentStatus = 0): Promise<number | Error> => {
    try {
        let count
        if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdHorario === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdHorario) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdHorario === 0 && filterIdStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdHorario === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdHorario === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdStatus === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdStatus === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdClient === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdHorario === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idClient', '=', filterIdClient)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdHorario === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdHorario === 0 && filterIdStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdHorario === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdProfessional === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdClient === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdHorario === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        } else if (filterIdPaymentStatus === 0) {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .count<[{ count: number}]>('* as count')
        } else {
            [{ count }] = await Knex(ETableNames.agendamento)
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .count<[{ count: number}]>('* as count')
        }
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}