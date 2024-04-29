import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Serviços - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Corte, estilização, lavagem, secagem e acabamento'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
    it('Tenta criar um registro com name tendo menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Co',
                genericDescription: 'Corte, estilização, lavagem, secagem e acabamento'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com name com mais de 75 caracteres', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo Extremamente Topzera das Galáxias das Estrelas do Cinema Internacional',
                genericDescription: 'Corte, estilização, lavagem, secagem e acabamento'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com genericDescription com mais de 200 caracteres', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Corte de todo tipo de cabelo, do liso ao crespo, passando pelo encaracolado e qualquer outro tipo de cabelo que exitir. Para os carecas tratamos o seu aeroporto de mosquito com os melhores produtos de modo a deixá-lo reluzente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.genericDescription')
    })

    it('Tenta criar um registro com genericDescription com menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Co'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.genericDescription')
    })

    it('Tenta criar enviando name e genericDescription como strings vazias', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: '',
                genericDescription: ''
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.genericDescription')

    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/servicos')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})