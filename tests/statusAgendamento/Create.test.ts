import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Agendamento - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/statusagendamento')
            .send({
                status: 'Agendado (aguardando aceite do profissional)',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar registro ja cadastrado', async () => {

        const resposta = await testServer.post('/statusagendamento')
            .send({
                status: 'Agendado (aguardando aceite do profissional)',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta criar registro com status de menos de três caracteres', async () => {

        const resposta = await testServer.post('/statusagendamento')
            .send({
                status: 'Ag'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta criar registro com status de mais de 75 caracteres', async () => {

        const resposta = await testServer.post('/statusagendamento')
            .send({
                status: 'Cliente tentou agendar e o profissional tentou confirmar o agendamento, porém tudo deu errado'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta criar registro vazio', async () => {

        const resposta = await testServer.post('/statusagendamento')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })
})