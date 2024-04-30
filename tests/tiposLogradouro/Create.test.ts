import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Logradouro - Create', () => {
   

    it('Criar registro', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Aeroporto'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar registro já existente', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Aeroporto'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro com type de menos de três caracteres', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Ru'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.type')
    })

    it('Tenta criar registro com type de mais de 50 caracteres', async () => {

        const resposta = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Acesso de Marginal de Rodovia que antes era estrada'
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