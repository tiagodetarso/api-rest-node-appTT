import { IAgendamento } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (agendamento: Omit<IAgendamento, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.agendamento)
            .where('idClient', '=', agendamento.idClient)
            .andWhere ('idHorario', '=', agendamento.idHorario)
            .count<[{ count: number }]>('* as count')


        if (count > 0) {
            return new Error ('Este agendament.')
        }

        const [result] = await Knex(ETableNames.agendamento)
            .insert(agendamento, ['id'])

        if (typeof result === 'object') {
            return result.id
        } else if ( typeof result === 'number' ){
            return result
        }

        return new Error ('Erro ao cadastrar registro')

    } catch (error) {
        return new Error('Erro ao cadastrar o registro')
    }
}
