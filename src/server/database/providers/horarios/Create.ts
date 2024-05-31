import { IHorario } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (horario: Omit<IHorario, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.horario)
            .where('idProfessional', '=', horario.idProfessional)
            .andWhere('schedulingTime', '=', horario.schedulingTime)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Este horário já foi disponibilizado no sistema.')
        }

        const [result] = await Knex(ETableNames.horario)
            .insert(horario, ['id'])

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
