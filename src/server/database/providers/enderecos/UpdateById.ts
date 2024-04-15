import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IEndereco } from '../../models'


export const updateById = async (id:number, endereco: Omit<IEndereco, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.endereco)
            .update(endereco)
            .where('id', '=', id)

        if (result > 0)  return
        
        return new Error('Erro ao atualizar o registro')
        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro')
    }
}