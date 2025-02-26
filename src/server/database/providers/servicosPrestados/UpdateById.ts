import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IServicoPrestado } from '../../models'


export const updateById = async (id:number, servicoPrestado: Omit<IServicoPrestado, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.servicoPrestado)
            .update(servicoPrestado)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}