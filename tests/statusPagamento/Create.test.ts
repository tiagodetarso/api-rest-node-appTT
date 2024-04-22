import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/statuspagamento')
            .send({
                status: 'Não pago',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})