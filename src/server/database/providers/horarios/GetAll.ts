import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IHorario } from '../../models'

export const getAll = async (page: number, limit: number, filterIdProfessional: number, filterSchedulingTime: number, filterIsAvaiable: boolean, id=0): Promise<IHorario[] | Error> => {
    try {
        let result
        if (filterIdProfessional === 0 && filterSchedulingTime === 0){
            result = await Knex(ETableNames.horario)
                .select('*')
                .where('isAvaiable', '=', filterIsAvaiable)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdProfessional === 0){
            result = await Knex(ETableNames.horario)
                .select('*')
                .where('schedulingTime', '>=', filterSchedulingTime)
                .andWhere('isAvaiable', '=', filterIsAvaiable)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterSchedulingTime === 0){
            result = await Knex(ETableNames.horario)
                .select('*')
                .where('idProfessional', '=', filterIdProfessional)
                .andWhere('isAvaiable', '=', filterIsAvaiable)
                .offset((page - 1) * limit)
                .limit(limit)
        } else {
            result = await Knex(ETableNames.horario)
                .select('*')
                .where ('idProfessional', '=', filterIdProfessional)
                .andWhere('schedulingTime', '>=', filterSchedulingTime)
                .andWhere('isAvaiable', '=', filterIsAvaiable)
                .offset((page - 1) * limit)
                .limit(limit)
        }
        
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.horario)
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