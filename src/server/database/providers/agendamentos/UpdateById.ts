import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IAgendamento } from '../../models'


export const updateById = async (id:number, agendamento: Omit<IAgendamento, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.agendamento)
            .update(agendamento)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}