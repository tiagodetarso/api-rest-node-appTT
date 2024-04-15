import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'
import { ITipoDocumento } from '../../models'


export const getById = async (id:number): Promise<ITipoDocumento | Error> => {
    try {
        const result = await Knex(ETableNames.tipoDocumento)
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