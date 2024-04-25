import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Títulos Profissionais - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro Unisex',
                subtitle: 'Corte de cabelo masculino e feminino'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
    it('Tenta criar um registro com titulo com menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Ca',
                subtitle: 'Corte de cabelo masculino e feminino'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.title')
    })

    it('Tenta criar um registro com titulo com mais de 100 caracteres', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Eu estou tentando criar esse registro com título tendo mais de 100 caracteres. Será que eu vou conseguir',
                subtitle: 'Corte de cabelo masculino e feminino'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.title')
    })

    it('Tenta criar um registro com subtitulo com mais de 300 caracteres', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Neste campo deveremos ter uma descrição do tipo subtítulo com mais de trezentos caracteres, pois somente deste modo poderemos realizar este teste adequadamente, de modo a garantirmos o melhor funcionamento do sistema, proporcionando ao usuário uma experiência, não apenas satisfatória, mas excelente em todos os sentidos.'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.subtitle')
    })

    it('Tenta criar um registro com subtitulo com menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Co'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.subtitle')
    })

    it('Tenta criar enviando title e subtitle como strings vazias', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({
                title: '',
                subtitle: ''
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.title')
        expect(resposta.body).toHaveProperty('errors.body.subtitle')

    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/titulosprofissionais')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})