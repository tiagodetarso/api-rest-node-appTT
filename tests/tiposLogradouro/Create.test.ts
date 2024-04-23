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

    it('Tenta criar registro com type de menos de três caracteres', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Ru'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.type')
    })

    it('Tenta criar registro vazio', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.type')
    })
})