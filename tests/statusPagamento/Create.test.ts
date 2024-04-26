import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/statuspagamento')
            .send({
                status: 'Atendimento ainda não foi realizado',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
    it('Tenta criar registro com documentName de menos de três caracteres', async () => {

        const resposta = await testServer.post('/statuspagamento')
            .send({
                status: 'At'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta criar registro com type de mais de 75 caracteres', async () => {

        const resposta = await testServer.post('/statuspagamento')
            .send({
                status: 'Pago, porém pendente de confirmação, uma vez que o profissional não confirmou o recebimento'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta criar registro vazio', async () => {

        const resposta = await testServer.post('/statuspagamento')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })
})