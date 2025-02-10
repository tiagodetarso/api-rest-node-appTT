import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { 
    MunicipiosController,
    TiposLogradouroController,
    LogradourosController,
    EnderecosController,
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

import { ensureAuthenticated } from '../shared/middlewares'

const router = Router()

//Rota pública root
router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('REST API appTT')
}) 
 
// ROTAS PÚBLICAS

router.post('/cadastrar', PessoasController.createValidation, PessoasController.create)
router.post('/entrar', PessoasController.logInValidation, PessoasController.logIn)

// ROTAS PRIVADAS

router.post('/municipios',ensureAuthenticated, MunicipiosController.createValidation, MunicipiosController.create)
router.get('/municipios', MunicipiosController.getAllValidation, MunicipiosController.getAll)
router.get('/municipios/:id', MunicipiosController.getByIdValidation, MunicipiosController.getById)
router.put('/municipios/:id', ensureAuthenticated, MunicipiosController.updateByIdValidation, MunicipiosController.updateById)
router.delete('/municipios/:id', ensureAuthenticated, MunicipiosController.deleteByIdValidation, MunicipiosController.deleteById)

router.post('/tiposlogradouro', ensureAuthenticated, TiposLogradouroController.createValidation, TiposLogradouroController.create)
router.get('/tiposlogradouro', TiposLogradouroController.getAllValidation, TiposLogradouroController.getAll)
router.get('/tiposlogradouro/:id', TiposLogradouroController.getByIdValidation, TiposLogradouroController.getById)
router.put('/tiposlogradouro/:id', ensureAuthenticated, TiposLogradouroController.updateByIdValidation, TiposLogradouroController.updateById)
router.delete('/tiposlogradouro/:id', ensureAuthenticated, TiposLogradouroController.deleteByIdValidation, TiposLogradouroController.deleteById)

router.post('/logradouros', LogradourosController.createValidation, LogradourosController.create)
router.get('/logradouros', LogradourosController.getAllValidation, LogradourosController.getAll)
router.get('/logradouros/:id', LogradourosController.getByIdValidation, LogradourosController.getById)
router.put('/logradouros/:id', ensureAuthenticated, LogradourosController.updateByIdValidation, LogradourosController.updateById)
router.delete('/logradouros/:id', ensureAuthenticated, LogradourosController.deleteByIdValidation, LogradourosController.deleteById)

router.post('/enderecos', EnderecosController.createValidation, EnderecosController.create)
router.get('/enderecos', EnderecosController.getAllValidation, EnderecosController.getAll)
router.get('/enderecos/:id', EnderecosController.getByIdValidation, EnderecosController.getById)
router.put('/enderecos/:id', ensureAuthenticated, EnderecosController.updateByIdValidation, EnderecosController.updateById)
router.delete('/enderecos/:id', ensureAuthenticated, EnderecosController.deleteByIdValidation, EnderecosController.deleteById)

router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll)
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById)
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById)

router.post('/clientes', ClientesController.createValidation, ClientesController.create)
router.get('/clientes', ensureAuthenticated, ClientesController.getAllValidation, ClientesController.getAll)
router.get('/clientes/:id', ensureAuthenticated, ClientesController.getByIdValidation, ClientesController.getById)
router.put('/clientes/:id', ensureAuthenticated, ClientesController.updateByIdValidation, ClientesController.updateById)
router.delete('/clientes/:id', ensureAuthenticated, ClientesController.deleteByIdValidation, ClientesController.deleteById)

router.post('/profissionais', ProfissionaisController.createValidation, ProfissionaisController.create)
router.get('/profissionais', ensureAuthenticated, ProfissionaisController.getAllValidation, ProfissionaisController.getAll)
router.get('/profissionais/:id', ensureAuthenticated, ProfissionaisController.getByIdValidation, ProfissionaisController.getById)
router.put('/profissionais/:id', ensureAuthenticated, ProfissionaisController.updateByIdValidation, ProfissionaisController.updateById)
router.delete('/profissionais/:id', ensureAuthenticated, ProfissionaisController.deleteByIdValidation, ProfissionaisController.deleteById)

router.post('/titulosprofissionais', ensureAuthenticated, TitulosProfissionaisController.createValidation, TitulosProfissionaisController.create)
router.get('/titulosprofissionais', TitulosProfissionaisController.getAllValidation, TitulosProfissionaisController.getAll)
router.get('/titulosprofissionais/:id', TitulosProfissionaisController.getByIdValidation, TitulosProfissionaisController.getById)
router.put('/titulosprofissionais/:id', ensureAuthenticated, TitulosProfissionaisController.updateByIdValidation, TitulosProfissionaisController.updateById)
router.delete('/titulosprofissionais/:id', TitulosProfissionaisController.deleteByIdValidation, TitulosProfissionaisController.deleteById)

router.post('/tiposdocumento', ensureAuthenticated, TiposDocumentoController.createValidation, TiposDocumentoController.create)
router.get('/tiposdocumento', TiposDocumentoController.getAllValidation, TiposDocumentoController.getAll)
router.get('/tiposdocumento/:id', TiposDocumentoController.getByIdValidation, TiposDocumentoController.getById)
router.put('/tiposdocumento/:id', ensureAuthenticated, TiposDocumentoController.updateByIdValidation, TiposDocumentoController.updateById)
router.delete('/tiposdocumento/:id', ensureAuthenticated, TiposDocumentoController.deleteByIdValidation, TiposDocumentoController.deleteById)

router.post('/servicosprestados', ensureAuthenticated, ServicosPrestadosController.createValidation, ServicosPrestadosController.create)
router.get('/servicosprestados', ensureAuthenticated, ServicosPrestadosController.getAllValidation, ServicosPrestadosController.getAll)
router.get('/servicosprestados/:id', ensureAuthenticated, ServicosPrestadosController.getByIdValidation, ServicosPrestadosController.getById)
router.put('/servicosprestados/:id', ensureAuthenticated, ServicosPrestadosController.updateByIdValidation, ServicosPrestadosController.updateById)
router.delete('/servicosprestados/:id', ensureAuthenticated, ServicosPrestadosController.deleteByIdValidation, ServicosPrestadosController.deleteById)

router.post('/servicos', ensureAuthenticated, ServicosController.createValidation, ServicosController.create)
router.get('/servicos', ensureAuthenticated, ServicosController.getAllValidation, ServicosController.getAll)
router.get('/servicos/:id', ensureAuthenticated, ServicosController.getByIdValidation, ServicosController.getById)
router.put('/servicos/:id', ensureAuthenticated, ServicosController.updateByIdValidation, ServicosController.updateById)
router.delete('/servicos/:id', ensureAuthenticated, ServicosController.deleteByIdValidation, ServicosController.deleteById)

router.post('/horarios', ensureAuthenticated, HorariosController.createValidation, HorariosController.create)
router.get('/horarios', ensureAuthenticated, HorariosController.getAllValidation, HorariosController.getAll)
router.get('/horarios/:id', ensureAuthenticated, HorariosController.getByIdValidation, HorariosController.getById)
router.put('/horarios/:id', ensureAuthenticated, HorariosController.updateByIdValidation, HorariosController.updateById)
router.delete('/horarios/:id', ensureAuthenticated, HorariosController.deleteByIdValidation, HorariosController.deleteById)

router.post('/statusagendamento', ensureAuthenticated, StatusAgendamentoController.createValidation, StatusAgendamentoController.create)
router.get('/statusagendamento', ensureAuthenticated, StatusAgendamentoController.getAllValidation, StatusAgendamentoController.getAll)
router.get('/statusagendamento/:id', ensureAuthenticated, StatusAgendamentoController.getByIdValidation, StatusAgendamentoController.getById)
router.put('/statusagendamento/:id', ensureAuthenticated, StatusAgendamentoController.updateByIdValidation, StatusAgendamentoController.updateById)
router.delete('/statusagendamento/:id', ensureAuthenticated, StatusAgendamentoController.deleteByIdValidation, StatusAgendamentoController.deleteById)

router.post('/statuspagamento', ensureAuthenticated, StatusPagamentoController.createValidation, StatusPagamentoController.create)
router.get('/statuspagamento', ensureAuthenticated, StatusPagamentoController.getAllValidation, StatusPagamentoController.getAll)
router.get('/statuspagamento/:id', ensureAuthenticated, StatusPagamentoController.getByIdValidation, StatusPagamentoController.getById)
router.put('/statuspagamento/:id', ensureAuthenticated, StatusPagamentoController.updateByIdValidation, StatusPagamentoController.updateById)
router.delete('/statuspagamento/:id', ensureAuthenticated, StatusPagamentoController.deleteByIdValidation, StatusPagamentoController.deleteById)

router.post('/agendamentos', ensureAuthenticated, AgendamentosController.createValidation, AgendamentosController.create)
router.get('/agendamentos', ensureAuthenticated, AgendamentosController.getAllValidation, AgendamentosController.getAll)
router.get('/agendamentos/:id', ensureAuthenticated, AgendamentosController.getByIdValidation, AgendamentosController.getById)
router.put('/agendamentos/:id', ensureAuthenticated, AgendamentosController.updateByIdValidation, AgendamentosController.updateById)
router.delete('/agendamentos/:id', ensureAuthenticated, AgendamentosController.deleteByIdValidation, AgendamentosController.deleteById)


export { router }