import { IAgendamento,
    ICliente,
    IHorario,
    ILogradouro,
    IEndereco,
    IMunicipio,
    IPessoa,
    IProfissional,
    IServico, 
    IServicoPrestado,
    IStatusAgendamento,
    IStatusPagamento,
    ITipoDocumento,
    ITipoLogradouro,
    ITituloProfissional, } from '../../models'


declare module 'knex/types/tables' {
    interface Tables {
        agendamento: IAgendamento
        cliente: ICliente
        horario: IHorario
        logradouro: ILogradouro
        endereco: IEndereco
        municipio: IMunicipio
        pessoa: IPessoa
        profissional: IProfissional
        servico: IServico
        servicoPrestado: IServicoPrestado,
        statusAgendamento: IStatusAgendamento,
        statusPagamento: IStatusPagamento,
        tipoDocumento: ITipoDocumento,
        tipoLogradouro: ITipoLogradouro,
        tituloProfissional: ITituloProfissional
    }
}