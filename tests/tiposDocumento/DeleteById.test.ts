import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Tipos de Documento - DeleteById', () => {

    let tipoDocumento: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreate = await testServer
            .post('/tiposdocumento')
            .send({
                documentName: 'CNPXota'
            })
        
        tipoDocumento = respostaCreate.body.content
    })

    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/tiposdocumento/${tipoDocumento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/tiposdocumento/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})