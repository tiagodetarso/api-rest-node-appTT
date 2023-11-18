import { IPessoa } from './Pessoa'

export interface IProfissional extends IPessoa {
    id: number
    idPessoa: number
    idProfessionalTitle: number,
    idDocumento:number,
    documentNumber: number,
    isActive: boolean,
}