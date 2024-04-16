import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'
import { IServico } from '../../models'


export const getById = async (id:number): Promise<IServico | Error> => {
    try {
        const result = await Knex(ETableNames.servico)
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