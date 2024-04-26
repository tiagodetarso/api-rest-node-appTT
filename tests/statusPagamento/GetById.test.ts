import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - GetById', () =>{

    let statusPagamento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/statuspagamento')
            .send({
                status: 'Pago (profissional confirma o pagamento antecipado)'
            })
        
        statusPagamento= respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/statuspagamento/${statusPagamento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('status')
        expect(resposta.body.status).toEqual('Pago (profissional confirma o pagamento antecipado)')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/statuspagamento/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/statuspagamento/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/statuspagamento/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/statuspagamento/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/statuspagamento/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})