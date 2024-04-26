import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export const seed = async(knex: Knex) => {

    const [{count}] = await knex(ETableNames.tituloProfissional).count<[{count: number}]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0) return
    
    const tituloToInsert = tituloProfissional.map(titulo => ({title: titulo[0], subtitle: titulo[1]}))
    await knex(ETableNames.tituloProfissional).insert(tituloToInsert)
}

const tituloProfissional = [
    ['Cabeleireiro(a)', 'Cabelos Femininos'],
    ['Cabeleireiro(a)', 'Cabelos Masculinos'],
    ['Barbeiro(a)', 'Estilização de Cabelos e Barbas'],
    ['Manicure', 'Unisex'],
    ['Manicure', 'Mãos e Pés Femininos'],
    ['Pedicure', 'Unisex'],
    ['Pedicure', 'Mãos e Pés Femininos'],
    ['Maquiador(a)', 'Unisex'],
    ['Maquiador(a)', 'Rostos Femininos'],
    ['Designer', 'Unhas'],
    ['Designer', 'Sombrancelhas'],
]