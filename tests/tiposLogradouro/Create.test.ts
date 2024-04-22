import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Tipos de Logradouro - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
})