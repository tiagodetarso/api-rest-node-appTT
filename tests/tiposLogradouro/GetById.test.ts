import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Logradouro - GetById', () =>{

    let tipoLogradouro: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Rodovia'
            })
        
        tipoLogradouro= respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/tiposlogradouro/${tipoLogradouro}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('type')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/tiposlogradouro/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/tiposlogradouro/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/tiposlogradouro/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/tiposlogradouro/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/tiposlogradouro/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})