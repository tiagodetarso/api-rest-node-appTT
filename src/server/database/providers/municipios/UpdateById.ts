import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IMunicipio } from '../../models'


export const updateById = async (id:number, municipio: Omit<IMunicipio, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.municipio)
            .update(municipio)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}