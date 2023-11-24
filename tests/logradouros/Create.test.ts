import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Logradouros - Create', () => {


    it('Criar registro', async () => {

        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Astorga',
                state: 'PR'
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body.msg).toEqual('string')
        expect(typeof res1.body.content).toEqual('number')

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        expect(res2.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res2.body.msg).toEqual('string')
        expect(typeof res2.body.content).toEqual('number')

        //cria logradouro
        const resposta = await testServer.post('/logradouros')
            .send({
                idCity: res1.body.content,
                idPlaceType: res2.body.content,
                name: 'José Mendes Rodrigues',
                number: 45,
                neighborhood: 'Jardim Lice I'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
})