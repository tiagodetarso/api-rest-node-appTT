import { ITipoDocumento } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (tipoDocumento: Omit<ITipoDocumento, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.tipoDocumento)
            .where('documentName', '=', tipoDocumento.documentName)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O tipo de documento já existe.')
        }

        const [result] = await Knex(ETableNames.tipoDocumento)
            .insert(tipoDocumento, ['id'])

        if (typeof result === 'object') {
            return result.id
        } else if ( typeof result === 'number' ){
            return result
        }

        return new Error ('Erro ao cadastrar registro')

    } catch (error) {
        return new Error('Erro ao cadastrar o registro')
    }
}