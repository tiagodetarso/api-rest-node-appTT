import { IEndereco } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (endereco: Omit<IEndereco, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.endereco)
            .where ('idCity', '=', endereco.idCity)
            .where('idLogradouro', '=', endereco.idLogradouro)
            .andWhere('number', '=', endereco.number)
            .andWhere('neighborhood', '=', `${endereco.neighborhood}`)
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Este logradouro já foi cadastrado anteriormente.')
        }

        const [result] = await Knex(ETableNames.endereco)
            .insert(endereco, ['id'])

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