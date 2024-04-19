import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IStatusPagamento } from '../../models'


export const updateById = async (id:number, statusPagamento: Omit<IStatusPagamento, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.statusPagamento)
            .update(statusPagamento)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}