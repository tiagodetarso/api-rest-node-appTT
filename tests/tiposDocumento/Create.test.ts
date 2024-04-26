import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Documento Profissional - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/tiposDocumento')
            .send({
                documentName: 'RPA - Registro Profissional de Autônomo',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar registro com documentName de menos de três caracteres', async () => {

        const resposta = await testServer.post('/tiposdocumento')
            .send({
                documentName: 'RP'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.documentName')
    })

    it('Tenta criar registro com type de mais de 50 caracteres', async () => {

        const resposta = await testServer.post('/tiposdocumento')
            .send({
                documenteName: 'RPTAB - Registro Profissional de Trabalhado Autônomo Brasileiro'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.documentName')
    })

    it('Tenta criar registro vazio', async () => {

        const resposta = await testServer.post('/tiposdocumento')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.documentName')
    })
})