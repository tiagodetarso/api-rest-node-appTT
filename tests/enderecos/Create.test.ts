import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Endereços - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Iguaraçu',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rodovia'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'PR-317'
            })
        
        logradouro = res3.body.content
        console.log(logradouro)
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 237,
                neighborhood: 'AlphaVille'
            })
        console.log(resposta.body)
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar registro já cadastrado', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 237,
                neighborhood: 'AlphaVille'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com Neighborhood tendo menos de 3 caracteres e Number = 0', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 0,
                neighborhood: 'Al'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.neighborhood')
        expect(resposta.body).toHaveProperty('errors.body.number')
    })

    it('Tenta criar um registro com Neighborhood com mais de 75 caracteres e Number negativo', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: -237,
                neighborhood: 'Vila Comunidade Periférica das Pessoas que São Esculhanbadas Pela Polícia Sem Motivo Algum'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.neighborhood')
        expect(resposta.body).toHaveProperty('errors.body.number')
    })

    it('Tenta criar um registro com idPublicPlace invalido', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: 999,
                number: 237,
                neighborhood: 'AlphaVille'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idPublicPlace e number do tipo string', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: 'Rodovia PR-317, Iguaraçu-PR',
                number: 'duzentos e trinta e sete',
                neighborhood: 'AlphaVille'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPublicPlace')
        expect(resposta.body).toHaveProperty('errors.body.number')
        
    })

    it('Tenta criar enviando neighborhood como string vazia, idPublicPlace e number com valor igual a zero', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: 0,
                number: 0,
                neighborhood: ''
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPublicPlace')
        expect(resposta.body).toHaveProperty('errors.body.number')
        expect(resposta.body).toHaveProperty('errors.body.neighborhood')

    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})
    