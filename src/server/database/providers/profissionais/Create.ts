import { IProfissional } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (profissional: Omit<IProfissional, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.profissional)
            .where('idPessoa', '=', profissional.idPessoa)
            .andWhere('idProfessionalTitle', '=', profissional.idProfessionalTitle)
            .andWhere('isActive', '=', profissional.isActive)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Esta pessoa já esta cadastrada como profissional.')
        }

        const [result] = await Knex(ETableNames.profissional)
            .insert(profissional, ['id'])

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
