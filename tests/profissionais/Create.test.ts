import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Profissionais - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let endereco2: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let tituloProfissional2: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Guaratuba',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Praia'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Central',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 75,
                neighborhood: 'Orla Guaratubana'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 250,
                neighborhood: 'Orla Guaratubana'
            })
        
        endereco2 = res5.body.content

        //cria pessoa do profissional
        const res6 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Arlindo',
                lastName: 'Natiruts',
                email: 'arnat@gmail.com',
                phoneNumber: '(41) 9 9999-0100',
                whatsappNumber: '(41) 9 9999-0100',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res6.body.content

        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Jamile',
                lastName: 'Natiruts',
                email: 'janat@gmail.com',
                phoneNumber: '(41) 9 9999-0101',
                whatsappNumber: '(41) 9 9999-0101',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa2 = res7.body.content

        //cria o título profissional
        const res8 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Psicólogo',
                subtitle: 'Comportamental'
            })
        
        tituloProfissional = res8.body.content

        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Médico',
                subtitle: 'Psiquiatra'
            })
        
        tituloProfissional2 = res9.body.content
    })

    it('Cria registro', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco2,
                isActive: true
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Cria registro com mesma idPessoa porém idProfessionalTitle diferente', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco2,
                isActive: true
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar um novo profissional com uma pessoa já cadastrada como profissional com o mesmo título profissional', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro com idPessoa, idProfessionalTitle e serviceAddress iguais a 0', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: 0,
                idProfessionalTitle: 0,
                serviceAddress:0,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPessoa')
        expect(resposta.body).toHaveProperty('errors.body.idProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.body.serviceAddress')
    })

    it('Tenta criar registro com idPessoa, idProfessionalTitle e serviceAddress sendo negativos', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: -1,
                idProfessionalTitle: -1,
                serviceAddress: -1,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPessoa')
        expect(resposta.body).toHaveProperty('errors.body.idProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.body.serviceAddress')
    })

    it('Tenta criar registro com idPessoa, idProfessionalTitle e serviceAddress sendo strings', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: 'Arlindo',
                idProfessionalTitle: 'Psicólogo',
                serviceAddress: 'Praia Central, 250',
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idPessoa')
        expect(resposta.body).toHaveProperty('errors.body.idProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.body.serviceAddress')
    })

    it('Tenta criar um registro com idPessoa invalido', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: 999,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco2,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idProfessionalTitle invalido', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: 999,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com serviceAddress invalido', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: 999,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com isActive não sendo boolean', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa2,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco2,
                isActive: 'ativo'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.isActive')
    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/profissionais')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})