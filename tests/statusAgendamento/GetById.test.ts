import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Agendamento - GetById', () =>{

    let statusAgendamento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/statusagendamento')
            .send({
                status: 'Agendado (confirmado pelo profissional)'
            })
        
        statusAgendamento= respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/statusagendamento/${statusAgendamento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('status')
        expect(resposta.body.status).toEqual('Agendado (confirmado pelo profissional)')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/statusagendamento/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/statusagendamento/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/statusagendamento/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/statusagendamento/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/statusagendamento/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})