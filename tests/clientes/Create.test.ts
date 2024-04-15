import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Clientes - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let pessoa: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
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

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'José Mendes Rodrigues',
                number: 45,
                neighborhood: 'Jardim Lice I'
            })
        
        logradouro = res3.body.content

        //cria pessoa
        const res4 = await testServer.post('/cadastrar')
            .send({
                idPublicPlace: logradouro,
                name: 'Tiago de Tarso',
                lastName: 'Raggiotto Gonçalves',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41) 9 9909-8911',
                whatsappNumber: '(41) 9 9909-8911',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa = res4.body.content

    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: new Date(1983, 8, 16)
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})