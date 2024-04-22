import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Logradouros - Create', () => {

    let tipoLogradouro: number | undefined = undefined

    beforeAll( async() => {
        
        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Avenida'
            })
        
        tipoLogradouro = res2.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                name: 'Major Cagão',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    }) 
})