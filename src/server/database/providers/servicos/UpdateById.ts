import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IServico } from '../../models'


export const updateById = async (id:number, servico: Omit<IServico, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.servico)
            .update(servico)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}