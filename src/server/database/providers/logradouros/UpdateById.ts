import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ITipoLogradouro } from '../../models'


export const updateById = async (id:number, tipoLogradouro: Omit<ITipoLogradouro, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.tipoLogradouro)
            .update(tipoLogradouro)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}