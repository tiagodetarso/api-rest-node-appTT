import { IPessoa } from './Pessoa'

export interface ICliente extends IPessoa{
    id: number
    idPessoa: number
    genderId: string
    dateOfBirth: Date
    CPFNumber?: number
}