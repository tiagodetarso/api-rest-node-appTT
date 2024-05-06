import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'


export const count = async (filterName = '', filterLastName = '', filterEmail = '', filterPhoneNumber = '', filterWhatsappNumber = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.pessoa)
            .where('name', 'like', `%${filterName}%`)
            .andWhere('lastName', 'like', `%${filterLastName}%`)
            .andWhere('email', 'like', `%${filterEmail}%`)
            .andWhere('phoneNumber', 'like', `%${filterPhoneNumber}%`)
            .andWhere('whatsappNumber', 'like', `%${filterWhatsappNumber}%`)
            .count<[{ count: number}]>('* as count')
            
        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao consultar a quantidade de registros')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar a quantidade de registros')
    }
}