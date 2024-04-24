import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export const seed = async(knex: Knex) => {

    const [{count}] = await knex(ETableNames.tipoLogradouro).count<[{count: number}]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0) return
    
    const tiposLogradouroToInsert = tipoLogradouro.map(tipo => ({type: tipo}))
    await knex(ETableNames.tipoLogradouro).insert(tiposLogradouroToInsert)
}

const tipoLogradouro = [
    'Acesso',
    //'Acesso Local',
    //'Acampamento',
    //'Adro',
    //'Aeroporto',
    'Alameda',
    //'Alto',
    //'Anel Viário',
    //'Antiga Estrada',
    //'Área',
    //'Área Especial',
    //'Área Verde',
    //'Atalho',
    'Avenida',
    //'Avenida Contorno',
    'Avenida Marginal',
    //'Avenida Marginal Direita',
    //'Avenida Marginal Esquerda',
    'Balneário',
    'Beco',
    'Belvedere',
    //'Bloco',
    'Bosque',
    'Boulevard',
    //'Cais',
    //'Calçada',
    'Caminho',
    //'Campo',
    //'Canal',
    //'Chácara',
    //'Ciclovia',
    //'Colônia',
    //'Comunidade',
    //'Condomínio',
    //'Conjunto',
    'Contorno',
    //'Córrego',
    'Desvio',
    //'Distrito',
    //'Enseada',
    'Escadaria',
    //'Esplanada',
    //'Estação',
    //'Estádio',
    'Estrada',
    //'Estrada Antiga',
    //'Estrada de Ligação',
    'Estrada de Servidão',
    //'Estrada Intermunicipal',
    //'Estrada Municipal',
    //'Estrada Particular',
    //'Estrada Velha',
    'Estrada Vicinal',
    //'Favela',
    //'Fazenda',
    //'Feira',
    //'Ferrovia',
    //'Forte',
    'Galeria',
    //'Jardim',
    'Ladeira',
    //'Lago',
    //'Lagoa',
    'Largo',
    //'Lote',
    //'Loteamento',
    //'Margem',
    //'Marina',
    //'Monte',
    //'Morro',
    //'Núcleo',
    //'Núcleo Habitacional',
    //'Núcleo Rural',
    //'Parada',
    //'Parque',
    'Passagem',
    //'Passagem de Pedestre',
    'Passarela',
    'Passeio',
    //'Pátio',
    'Praça',
    //'Praça de Esportes',
    //'Ponte',
    //'Porto',
    //'Quadra',
    //'Quinta',
    //'Rampa',
    //'Recanto',
    //'Residêncial',
    //'Retorno',
    //'Rótula',
    //'Rotatória',
    'Rodovia',
    'Rua',
    'Ruela',
    'Servidão',
    //'Setor',
    //'Sítio',
    //'Terminal',
    'Travessa',
    //'Trecho',
    //'Trevo',
    'Trincheira',
    //'Vale',
    //'Vereda',
    'Via',
    //'Viaduto',
    'Viela',
    //'Vila'
]