import { IServicoPrestado } from '../../models'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const create = async (servicoPrestado: Omit<IServicoPrestado, 'id'>): Promise<Number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.servicoPrestado)
            .where ('idServico', '=', Number(servicoPrestado.idServico))
            .andWhere('idProfessional', '=', Number(servicoPrestado.idProfessional))
            .count<[{ count: number }]>('* as count')

        if (count > 0) {
            return new Error ('Este serviço já esta cadastrado para este profissional.')
        }

        const [result] = await Knex(ETableNames.servicoPrestado)
            .insert(servicoPrestado, ['id'])

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