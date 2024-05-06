import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'

export const getAll = async (page: number, limit: number, filterName: string, filterLastName: string, filterEmail: string, filterPhoneNumber: string, filterWhatsappNumber: string, id=0): Promise<IPessoa[] | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where ('name', 'like', `%${filterName}%`)
            .andWhere('lastName', 'like', `%${filterLastName}%`)
            .andWhere('email', 'like', `%${filterEmail}%`)
            .andWhere('phoneNumber', 'like', `%${filterPhoneNumber}%`)
            .andWhere('whatsappNumber', 'like', `%${filterWhatsappNumber}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.pessoa)
                .select('*')
                .where('id', '=', id)
                .first()
            
            if (resultById) return [...result, resultById]
        }

        return result

    } catch (error) {
        return new Error('Erro ao buscar registros')
    }
}