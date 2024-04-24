import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Tipos de Logradouro - DeleteById', () => {

    let tipoLogradouro: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreate = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Avenida'
            })
        
        tipoLogradouro = respostaCreate.body.content
        console.log(respostaCreate.body)
    })

    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/tiposlogradouro/${tipoLogradouro}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete(`/tiposlogradouro/${999}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/tiposlogradouro')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/tiposlogradouro/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/tiposlogradouro/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/tiposlogradouro/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/tiposlogradouro/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})