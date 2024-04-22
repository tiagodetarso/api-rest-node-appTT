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
                type: 'Travessa'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                name: 'Primeiro de Maio'
            })
        
        logradouro = res3.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                idCity: municipio,
                number: 237,
                neighborhood: 'AlphaVille'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})