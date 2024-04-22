import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IAgendamento } from '../../models'

export const getAll = async (page: number, limit: number, filterIdProfessional: number, filterIdClient: number, filterIdHorario: number, filterIdStatus: number, filterIdPaymentStatus: number, id=0): Promise<IAgendamento[] | Error> => {
    try {
        let result
        if (filterIdProfessional === 0) {
            if (filterIdClient === 0) {
                if (filterIdHorario === 0){
                    if (filterIdStatus === 0){
                        if(filterIdPaymentStatus === 0){
                            result = await Knex(ETableNames.agendamento)
                                .select('*')
                                .offset((page - 1) * limit)
                                .limit(limit)
                        }
                        result = await Knex(ETableNames.agendamento)
                            .select('*')
                            .where('idPaymentStatus', '=', filterIdPaymentStatus)
                            .offset((page - 1) * limit)
                            .limit(limit)
                    }
                    if ( filterIdPaymentStatus === 0) {
                        result = await Knex(ETableNames.agendamento)
                            .select('*')
                            .where('idStatus', '=', filterIdStatus)
                            .offset((page - 1) * limit)
                            .limit(limit)
                    }
                    result = await Knex(ETableNames.agendamento)
                        .select('*')
                        .where('idPaymentStatus', '=', filterIdPaymentStatus)
                        .andWhere('idStatus', '=', filterIdStatus)
                        .offset((page - 1) * limit)
                        .limit(limit)
                }
                if (filterIdStatus === 0 && filterIdPaymentStatus === 0) {
                    result = await Knex(ETableNames.agendamento)
                        .select('*')
                        .where('idHorario', '=', filterIdHorario)
                        .offset((page - 1) * limit)
                        .limit(limit)
                }
                if (filterIdStatus === 0) {
                    result = await Knex(ETableNames.agendamento)
                        .select('*')
                        .where('idHorario', '=', filterIdHorario)
                        .andWhere( 'idStatus', '=', filterIdStatus)
                        .offset((page - 1) * limit)
                        .limit(limit)
                }
                if (filterIdPaymentStatus === 0) {
                    result = await Knex(ETableNames.agendamento)
                        .select('*')
                        .where('idHorario', '=', filterIdHorario)
                        .andWhere( 'idPaymentStatus', '=', filterIdPaymentStatus)
                        .offset((page - 1) * limit)
                        .limit(limit)
                }
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idPaymentStatus', '=', filterIdPaymentStatus)
                    .andWhere('idStatus', '=', filterIdStatus)
                    .andWhere('idHorario', '=', filterIdHorario)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdPaymentStatus === 0 && filterIdStatus === 0 && filterIdHorario === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdPaymentStatus === 0 && filterIdStatus ===0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idHorario', '=', filterIdHorario)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdPaymentStatus === 0 && filterIdHorario === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idStatus', '=', filterIdStatus)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdStatus === 0 && filterIdHorario === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdPaymentStatus === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idHorario', '=', filterIdHorario)
                    .andWhere('idStatus', '=', filterIdStatus)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdStatus === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idHorario', '=', filterIdHorario)
                    .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            if (filterIdHorario === 0) {
                result = await Knex(ETableNames.agendamento)
                    .select('*')
                    .where('idClient', '=', filterIdClient)
                    .andWhere('idStatus', '=', filterIdStatus)
                    .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                    .offset((page - 1) * limit)
                    .limit(limit)
            }
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idPaymentStatus', '=', filterIdPaymentStatus)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idClient', '=', filterIdClient)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0){
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdHorario === 0 && filterIdStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdHorario === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idStatus', '=', filterIdStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdHorario === 0 && filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdHorario === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .andWhere('idHorario', '=', filterIdHorario)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idHorario', '=', filterIdHorario)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdHorario === 0 && filterIdStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdHorario === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdStatus === 0 && filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdClient === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdHorario === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idStatus', '=', filterIdStatus)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idPaymentStatus', '=', filterIdPaymentStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        if (filterIdPaymentStatus === 0) {
            result = await Knex(ETableNames.agendamento)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('idClient', '=', filterIdClient)
                .andWhere('idHorario', '=', filterIdHorario)
                .andWhere('idStatus', '=', filterIdStatus)
                .offset((page - 1) * limit)
                .limit(limit)
        }

        result = await Knex(ETableNames.agendamento)
            .select('*')
            .where('idPaymentStatus', '=', filterIdPaymentStatus)
            .andWhere('idStatus', '=', filterIdStatus)
            .andWhere('idHorario', '=', filterIdHorario)
            .andWhere('idClient', '=', filterIdClient)
            .andWhere('idProfessional', '=', )
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.agendamento)
                .select('*')
                .where('id', '=', id)
                .first()
            
            if (resultById) return [...result, resultById]
        }

        return result

    } catch (error) {
        return new Error('Erro ao buscar registros')
    }
}