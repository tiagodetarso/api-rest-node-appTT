import { IServico } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (servico: Omit<IServico, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.servico)
            .where('name', '=', servico.name)
            .andWhere('genericDescription', '=', servico.genericDescription)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('O Serviço já está cadastrado no sistema.')
        }

        const [result] = await Knex(ETableNames.servico)
            .insert(servico, ['id'])

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
