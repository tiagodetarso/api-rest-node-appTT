import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Títulos Profissionais - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Especializado em corte masculino'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
    it('Tenta criar um registro com titulo com menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Ca',
                subtitle: 'Especializado em corte masculino'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.title')
    })
})