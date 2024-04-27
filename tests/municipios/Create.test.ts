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

    it('Tenta criar um registro com name com menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: 'Ja',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com titulo com mais de 75 caracteres', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: 'São Gerônimo do Rio Abaixo da Maior Represa do Mundo ao Sul da Linha Equatorial',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com state com mais de 2 caracteres', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: 'Jaguapitã',
                state: 'Paraná'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.state')
    })

    it('Tenta criar um registro com state com menos de 2 caracteres', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: 'Pitangueiras',
                state: 'P'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.state')
    })

    it('Tenta criar enviando name e state como strings vazias', async () => {

        const resposta = await testServer.post('/municipios')
            .send({
                name: '',
                state: ''
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.state')

    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/municipios')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})