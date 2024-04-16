import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ITituloProfissional } from '../../models'


export const updateById = async (id:number, tituloProfissional: Omit<ITituloProfissional, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.tituloProfissional)
            .update(tituloProfissional)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}