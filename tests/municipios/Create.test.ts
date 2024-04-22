import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Municípios - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: 'Astorga',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
})