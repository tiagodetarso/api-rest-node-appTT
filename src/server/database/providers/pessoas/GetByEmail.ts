import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'


export const getByEmail = async (email:string): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select()
            .where('email', email)
            .first()

        if (result) return result

        return new Error('Usuário não encontrado')
    } catch (error) {
        return new Error('Usuário não encontrado')
    }
}