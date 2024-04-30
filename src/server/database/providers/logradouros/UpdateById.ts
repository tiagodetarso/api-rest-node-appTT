import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ILogradouro } from '../../models'


export const updateById = async (id:number, logradouro: Omit<ILogradouro, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.logradouro)
            .where('id', '=', id)
            .update(logradouro)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}