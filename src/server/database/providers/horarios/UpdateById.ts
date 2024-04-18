import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IHorario } from '../../models'


export const updateById = async (id:number, horario: Omit<IHorario, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.horario)
            .update(horario)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}