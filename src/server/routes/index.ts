import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { 
    MunicipiosController,
    TiposLogradouroController,
    LogradourosController,
    PessoasController,
    ClientesController,
    ProfissionaisController,
    TitulosProfissionaisController,
    TiposDocumentoController,
    ServicosPrestadosController,
    ServicosController,
    HorariosController,
    StatusPagamentoController,
    StatusAgendamentoController,
    AgendamentosController } from './../controllers'

const router = Router()

//Rota pública root
router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('REST API appTT')
}) 
 
// ROTAS PÚBLICAS

router.post('/cadastrar', PessoasController.createValidation, PessoasController.create)
router.post('/entrar', PessoasController.logInValidation, PessoasController.logIn)

// ROTAS PRIVADAS

router.post('/municipios', MunicipiosController.createValidation, MunicipiosController.create)
router.get('./municipios', MunicipiosController.getAllValidation, MunicipiosController.getAll)
router.get('./municipios/:id', MunicipiosController.getByIdValidation, MunicipiosController.getById)
router.put('./municipios/:id', MunicipiosController.updateByIdValidation, MunicipiosController.updateById)
router.delete('./municipios/:id', MunicipiosController.deleteByIdValidation, MunicipiosController.deleteById)

router.post('/tiposlogradouro', TiposLogradouroController.createValidation, TiposLogradouroController.create)
router.get('./tiposlogradouro', TiposLogradouroController.getAllValidation, TiposLogradouroController.getAll)
router.get('./tiposlogradouro/:id', TiposLogradouroController.getByIdValidation, TiposLogradouroController.getById)
router.put('./tiposlogradouro/:id', TiposLogradouroController.updateByIdValidation, TiposLogradouroController.updateById)
router.delete('./tiposlogradouro/:id', TiposLogradouroController.deleteByIdValidation, TiposLogradouroController.deleteById)

router.post('/logradouros', LogradourosController.createValidation, LogradourosController.create)
router.get('./logradouros', LogradourosController.getAllValidation, LogradourosController.getAll)
router.get('./logradouros/:id', LogradourosController.getByIdValidation, LogradourosController.getById)
router.put('./logradouros/:id', LogradourosController.updateByIdValidation, LogradourosController.updateById)
router.delete('./logradouros/:id', LogradourosController.deleteByIdValidation, LogradourosController.deleteById)

router.get('./pessoas', PessoasController.getAllValidation, PessoasController.getAll)
router.get('./pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById)
router.put('./pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('./pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById)

router.post('/clientes', ClientesController.createValidation, ClientesController.create)
router.get('./clientes', ClientesController.getAllValidation, ClientesController.getAll)
router.get('./clientes/:id', ClientesController.getByIdValidation, ClientesController.getById)
router.put('./clientes/:id', ClientesController.updateByIdValidation, ClientesController.updateById)
router.delete('./clientes/:id', ClientesController.deleteByIdValidation, ClientesController.deleteById)

router.post('/profissionais', ProfissionaisController.createValidation, ProfissionaisController.create)
router.get('./profissionais', ProfissionaisController.getAllValidation, ProfissionaisController.getAll)
router.get('./profissionais/:id', ProfissionaisController.getByIdValidation, ProfissionaisController.getById)
router.put('./profissionais/:id', ProfissionaisController.updateByIdValidation, ProfissionaisController.updateById)
router.delete('./profissionais/:id', ProfissionaisController.deleteByIdValidation, ProfissionaisController.deleteById)

router.post('/titulosprofissionais', TitulosProfissionaisController.createValidation, TitulosProfissionaisController.create)
router.get('./titulosprofissionais', TitulosProfissionaisController.getAllValidation, TitulosProfissionaisController.getAll)
router.get('./titulosprofissionais/:id', TitulosProfissionaisController.getByIdValidation, TitulosProfissionaisController.getById)
router.put('./titulosprofissionais/:id', TitulosProfissionaisController.updateByIdValidation, TitulosProfissionaisController.updateById)
router.delete('./titulosprofissionais/:id', TitulosProfissionaisController.deleteByIdValidation, TitulosProfissionaisController.deleteById)

router.post('/tiposdocumento', TiposDocumentoController.createValidation, TiposDocumentoController.create)
router.get('./tiposdocumento', TiposDocumentoController.getAllValidation, TiposDocumentoController.getAll)
router.get('./tiposdocumento/:id', TiposDocumentoController.getByIdValidation, TiposDocumentoController.getById)
router.put('./tiposdocumento/:id', TiposDocumentoController.updateByIdValidation, TiposDocumentoController.updateById)
router.delete('./tiposdocumento/:id', TiposDocumentoController.deleteByIdValidation, TiposDocumentoController.deleteById)

router.post('/servicosprestados', ServicosPrestadosController.createValidation, ServicosPrestadosController.create)
router.get('./servicosprestados', ServicosPrestadosController.getAllValidation, ServicosPrestadosController.getAll)
router.get('./servicosprestados/:id', ServicosPrestadosController.getByIdValidation, ServicosPrestadosController.getById)
router.put('./servicosprestados/:id', ServicosPrestadosController.updateByIdValidation, ServicosPrestadosController.updateById)
router.delete('./servicosprestados/:id', ServicosPrestadosController.deleteByIdValidation, ServicosPrestadosController.deleteById)

router.post('/servicos', ServicosController.createValidation, ServicosController.create)
router.get('./servicos', ServicosController.getAllValidation, ServicosController.getAll)
router.get('./servicos/:id', ServicosController.getByIdValidation, ServicosController.getById)
router.put('./servicos/:id', ServicosController.updateByIdValidation, ServicosController.updateById)
router.delete('./servicos/:id', ServicosController.deleteByIdValidation, ServicosController.deleteById)

router.post('/horarios', HorariosController.createValidation, HorariosController.create)
router.get('./horarios', HorariosController.getAllValidation, HorariosController.getAll)
router.get('./horarios/:id', HorariosController.getByIdValidation, HorariosController.getById)
router.put('./horarios/:id', HorariosController.updateByIdValidation, HorariosController.updateById)
router.delete('./horarios/:id', HorariosController.deleteByIdValidation, HorariosController.deleteById)

router.post('/statusAgendamento', StatusAgendamentoController.createValidation, StatusAgendamentoController.create)
router.get('./statusAgendamento', StatusAgendamentoController.getAllValidation, StatusAgendamentoController.getAll)
router.get('./statusAgendamento/:id', StatusAgendamentoController.getByIdValidation, StatusAgendamentoController.getById)
router.put('./statusAgendamento/:id', StatusAgendamentoController.updateByIdValidation, StatusAgendamentoController.updateById)
router.delete('./statusAgendamento/:id', StatusAgendamentoController.deleteByIdValidation, StatusAgendamentoController.deleteById)

router.post('/statuspagamento', StatusPagamentoController.createValidation, StatusPagamentoController.create)
router.get('./statuspagamento', StatusPagamentoController.getAllValidation, StatusPagamentoController.getAll)
router.get('./statuspagamento/:id', StatusPagamentoController.getByIdValidation, StatusPagamentoController.getById)
router.put('./statuspagamento/:id', StatusPagamentoController.updateByIdValidation, StatusPagamentoController.updateById)
router.delete('./statuspagamento/:id', StatusPagamentoController.deleteByIdValidation, StatusPagamentoController.deleteById)

router.post('/agendamentos', AgendamentosController.createValidation, AgendamentosController.create)
router.get('./agendamentos', AgendamentosController.getAllValidation, AgendamentosController.getAll)
router.get('./agendamentos/:id', AgendamentosController.getByIdValidation, AgendamentosController.getById)
router.put('./agendamentos/:id', AgendamentosController.updateByIdValidation, AgendamentosController.updateById)
router.delete('./agendamentos/:id', AgendamentosController.deleteByIdValidation, AgendamentosController.deleteById)


export { router }