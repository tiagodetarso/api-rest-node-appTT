import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Documento - GetById', () =>{

    let tipoDocumento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/tiposDocumento')
            .send({
                documentName: 'N° Registro no Conselho de Classe'
            })
        
        tipoDocumento= respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/tiposDocumento/${tipoDocumento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('documentName')
        expect(resposta.body.documentName).toEqual('N° Registro no Conselho de Classe')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/tiposDocumento/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/tiposDocumento/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/tiposDocumento/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/tiposDocumento/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/tiposDocumento/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})