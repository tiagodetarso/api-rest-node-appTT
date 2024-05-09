import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Enderecos - DeleteById', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let cliente: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Pitangueiras',
                state: 'PR'
            })

        municipio = res1.body.content
        console.log(municipio)

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rodovia'
            })
        
        tipoLogradouro = res2.body.content
        console.log(municipio)

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'PR-111',
            })
        
        logradouro = res3.body.content
        console.log(logradouro)

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 15,
                neighborhood: 'Vila Rural'
            })
        
        endereco = res4.body.content
        console.log(endereco)

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Fulano',
                lastName: 'de Tal',
                email: 'fudetal@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa = res5.body.content
        console.log(pessoa)

        const res6 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1983, 8, 16).toString())
            })
        
        cliente = res6.body.content
        console.log(cliente)
    })

    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/clientes/${cliente}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete('/clientes/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/clientes')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/clientes/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/clientes/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/clientes/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/clientes/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id negativo', async() => {
        const resposta = await testServer
            .delete('/clientes/-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})