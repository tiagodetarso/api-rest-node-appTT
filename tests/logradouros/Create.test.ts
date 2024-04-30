import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Logradouros - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined

    beforeAll( async() => {
        
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Astorga',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        tipoLogradouro = res2.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'José Mendes Rodrigues'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    }) 

    it('Tenta criar registro já cadastrado', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'José Mendes Rodrigues'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com name tendo menos de 3 caracteres', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Co'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com name com mais de 75 caracteres', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Professor Armando Botelho Coelho da Eritréia Figueira Gonçalves Honroso Junqueira'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta criar um registro com idCity e IdPlaceType invalidos', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: 999,
                idPlaceType: 999,
                name: 'José Mendes Rodrigues'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idPlaceType com mais de 200 caracteres', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: 'Corte de todo tipo de cabelo, do liso ao crespo, passando pelo encaracolado e qualquer outro tipo de cabelo que exitir. Para os carecas tratamos o seu aeroporto de mosquito com os melhores produtos de modo a deixá-lo reluzente',
                name: 'Corte de Cabelo'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPlaceType')
    })

    it('Tenta criar um registro com idCity e idPlaceType do tipo string', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: 'Astorga-PR',
                idPlaceType: 'Rua',
                name: 'José Mendes Rodrigues'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPlaceType')
        expect(resposta.body).toHaveProperty('errors.body.idCity')
    })

    it('Tenta criar enviando name como string vazia, idCity e idPlaceType com valor igual a zero', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: 0,
                idPlaceType: 0,
                name: ''
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idCity')
        expect(resposta.body).toHaveProperty('errors.body.idPlaceType')
        expect(resposta.body).toHaveProperty('errors.body.name')

    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})