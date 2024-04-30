import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Municipios - UpdateById', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposLogradouro')
            .send({
                type: 'Travessa'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateL = await testServer
            .post('/municipios')
            .send({
                name: 'Jaguapitã',
                state: 'PR'
            })
        
        municipio = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'dos Trabalhadores Rurais',
            })
        
        logradouro = respostaCreate.body.content
  
    })
    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/logradouros/${logradouro}`)
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Aleluia'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/logradouros/${logradouro}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idCity).toEqual(municipio)
        expect(resVerificar.body.idPlaceType).toEqual(tipoLogradouro)
        expect(resVerificar.body.name).toEqual('Aleluia')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/logradouros/999')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Primavera'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com name Contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/logradouros/${logradouro}`)
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pr',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta atualizar registro com name contendo mais de 75 caracteres', async() => {

        const resposta = await testServer
            .put(`/logradouros/${logradouro}`)
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor da Santa União do Triunvirato Divino Eterno da Graça do Pai',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
    })

    it('Tenta atualizar registro com idCity inexistente', async() => {

        const resposta = await testServer
            .put(`/logradouros/${logradouro}`)
            .send({
                idCity: 999,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com idPlaceType inexistente', async() => {

        const resposta = await testServer
            .put(`/logradouros/${logradouro}`)
            .send({
                idCity: municipio,
                idPlaceType: 999,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/logradouros/0')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/logradouros/1.1')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/logradouros/1,1')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})