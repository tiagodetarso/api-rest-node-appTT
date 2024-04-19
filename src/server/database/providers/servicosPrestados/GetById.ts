import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'
import { IServicoPrestado } from '../../models'


export const getById = async (id:number): Promise<IServicoPrestado | Error> => {
    try {
        const result = await Knex(ETableNames.servicoPrestado)
            .select()
            .where('id', id)
            .first()

        if (result) return result

        return new Error('Erro ao buscar o registro')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao buscar o registro')
    }
}