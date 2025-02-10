
import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

import { ILogradouro } from '../models'

import { processJsonLogradouroFiles } from '../../shared/services/processJsonLogradouroFiles'



export const seed = async(knex: Knex) => {

    const listaLogradouro = await processJsonLogradouroFiles('../../../../logradouros')

    for (const municipio of listaLogradouro) {

        const [{count}] = await knex(ETableNames.logradouro).where('idCity', '=', municipio.codigoMunicipio).count<[{count: number}]>('* as count')

        if (!Number.isInteger(count) || Number(count) > 0) return

        const logradourosDoMunicipio = [...new Set(municipio.arrayLogradouros)]

        for (const logradouro of logradourosDoMunicipio) {

            const logradouroToInsert: Omit<ILogradouro, 'id'> = {idCity: municipio.codigoMunicipio, name: logradouro}
            
            await knex(ETableNames.logradouro).insert(logradouroToInsert)
        }
    }
}