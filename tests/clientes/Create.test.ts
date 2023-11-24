import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Pessoas - Create', () => {


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
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: res1.body.content,
                idPlaceType: res2.body.content,
                name: 'José Mendes Rodrigues',
                number: 45,
                neighborhood: 'Jardim Lice I'
            })
        
        expect(res3.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res3.body.msg).toEqual('string')
        expect(typeof res3.body.content).toEqual('number')

        //cria pessoa
        const res4 = await testServer.post('/cadastrar')
            .send({
                idPublicPlace: res3.body.content,
                name: 'Tiago de Tarso',
                lastName: 'Raggiotto Gonçalves',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41) 9 9909-8911',
                whatsappNumber: '(41) 9 9909-8911',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        expect(res4.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res4.body.msg).toEqual('string')
        expect(typeof res4.body.content).toEqual('number')

        //cria cliente
        const resposta = await testServer.post('/clientes')
            .send({
                idPessoa: res4.body.content,
                genderId: 'Homem Heterossexual',
                dateOfBirth: new Date(1983, 8, 16)
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
})