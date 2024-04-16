import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IProfissional } from '../../models'


export const updateById = async (id:number, profissional: Omit<IProfissional, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.profissional)
            .update(profissional)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}