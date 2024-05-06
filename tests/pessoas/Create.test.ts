import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Munhoz de Melo',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Estrada Vicinal'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'José Silva',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 3456,
                neighborhood: 'Vila Rural das Uvas'
            })
        
        endereco = res4.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Tiago de Tarso',
                lastName: 'Raggiotto Gonçalves',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41)9 9909-8911',
                whatsappNumber: '(41)9 9909-8911',
                registrationDate: new Date().toString(),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar registro com e-mail já cadastrado no sistema', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Tiago',
                lastName: 'Raggiotto',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate: new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com name e lastName contendo menos de 3 caracteres e email em formato diferente do formato de e-mail', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Ti',
                lastName: 'Ra',
                email: 'titarsogmail.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate:new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.lastName')
        expect(resposta.body).toHaveProperty('errors.body.email')
    })

    it('Tenta criar um registro com phoneNumber e whatsappNumber contendo menos de 10 caracteres, com date sendo undefined e password contendo menos de 4 caracteres ', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Tiago',
                lastName: 'Raggio',
                email: 'titarso@gmail.com',
                phoneNumber: '999098888',
                whatsappNumber: '99909888',
                registrationDate: undefined,
                password: '123',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.phoneNumber')
        expect(resposta.body).toHaveProperty('errors.body.whatsappNumber')
        expect(resposta.body).toHaveProperty('errors.body.registrationDate')
        expect(resposta.body).toHaveProperty('errors.body.password')
    })

    it('Tenta criar um registro com name e lastName com mais de 80 caracteres e email com menos de 8 caracteres', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Tiago Orestes Genaro Giácomo de Tarso Francisco Orestes Genaro Giácomo de Tarso Francisco',
                lastName: 'da Silva e Sousa Silveira de Oliveira Cardoso Botelho Pinto Grande Raggiotto Gonçalves',
                email: 't@m.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate: new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.lastName')
        expect(resposta.body).toHaveProperty('errors.body.email')
    })

    it('Tenta criar um registro com phoneNumber e whatsappNumber contendo mais de 16 caracteres e password contendo mais de 20 caracteres ', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Tiago',
                lastName: 'Raggio',
                email: 'titarso@gmail.com',
                phoneNumber: '( 41 ) 9 9909-8888',
                whatsappNumber: '( 41 ) 9 9909-8888',
                registrationDate: new Date().toString(),
                password: 'euduvidomuitovoceadivinharessasenhaaquiseufdp',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.phoneNumber')
        expect(resposta.body).toHaveProperty('errors.body.whatsappNumber')
        expect(resposta.body).toHaveProperty('errors.body.password')
    })

    it('Tenta criar um registro com idAdress invalido', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: 999,
                name: 'Tiago',
                lastName: 'Raggiotto',
                email: 'titarso@gmail.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate: new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idAdress do tipo string', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: 'Rua José Mendes Rodrigues, 45, Jardim Lice I, Astorga-PR',
                name: 'Tiago',
                lastName: 'Raggiotto',
                email: 'titarso@gmail.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate: new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idAdress')
    })

    it('Tenta criar registro com idAdress=0', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({
                idAdress: 0,
                name: 'Tiago',
                lastName: 'Raggiotto',
                email: 'titarso@gmail.com',
                phoneNumber: '(41) 9 9909-8888',
                whatsappNumber: '(41) 9 9909-888',
                registrationDate: new Date().toString(),
                password: '123abc',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idAdress')
    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/cadastrar')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})