import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IProfissional } from '../../models'

export const getAll = async (page: number, limit: number, filterIdPessoa: number, filterIdProfessionalTitle: number, filterServiceAddress: number, filterIsActive: boolean, id=0): Promise<IProfissional[] | Error> => {
    try {
        let result
        if (filterIdPessoa === 0 && filterIdProfessionalTitle === 0 && filterServiceAddress === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0 && filterServiceAddress === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0 && filterIdProfessionalTitle === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('serviceAddress', '=', filterServiceAddress)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterServiceAddress === 0 && filterIdProfessionalTitle === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdProfessionalTitle === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('idPessoa', '=', filterIdPessoa)
                .andWhere('serviceAddress', '=', filterServiceAddress)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterIdPessoa === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('serviceAddress', '=', filterServiceAddress)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else if (filterServiceAddress === 0) {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('idPessoa', '=', filterIdPessoa)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        } else {
            result = await Knex(ETableNames.profissional)
                .select('*')
                .where ('idPessoa', '=', filterIdPessoa)
                .andWhere('idProfessionalTitle', '=', filterIdProfessionalTitle)
                .andWhere('serviceAddress', '=', filterServiceAddress)
                .andWhere('isActive', '=', filterIsActive)
                .offset((page - 1) * limit)
                .limit(limit)
        }

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.profissional)
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