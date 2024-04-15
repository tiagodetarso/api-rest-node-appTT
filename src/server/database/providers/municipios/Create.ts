import { IMunicipio } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (municipio: Omit<IMunicipio, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.municipio)
            .where('name', '=', municipio.name)
            .andWhere('state', '=', municipio.state)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O município já foi cadastrado anteriormente.')
        }

        const [result] = await Knex(ETableNames.municipio)
            .insert(municipio, ['id'])

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