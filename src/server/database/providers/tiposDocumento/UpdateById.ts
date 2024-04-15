import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ITipoDocumento } from '../../models'


export const updateById = async (id:number, tipoDocumento: Omit<ITipoDocumento, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.tipoDocumento)
            .update(tipoDocumento)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}