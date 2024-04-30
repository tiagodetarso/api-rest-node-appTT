import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Logradouros - DeleteById', () => {

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposLogradouro')
            .send({
                type: 'Avenida'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateL = await testServer
            .post('/municipios')
            .send({
                name: 'Sabáudia',
                state: 'PR'
            })
        
        municipio = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'das Camélias',
            })
        
        logradouro = respostaCreate.body.content
    })

    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/logradouros/${logradouro}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete('/logradouros/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/logradouros')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/logradouros/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/logradouros/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/logradouros/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/logradouros/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})