import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'
import { ICliente } from '../../models'


export const getById = async (id:number): Promise<ICliente | Error> => {
    try {
        const result = await Knex(ETableNames.cliente)
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