import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Profissionais - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Jandaia do Sul',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Passagem'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'dos Ratos'
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 171,
                neighborhood: 'Jardim Rato Pequeno'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Hosana',
                lastName: 'Pastel',
                email: 'hostel@gmail.com',
                phoneNumber: '(41)9 9999-1101',
                whatsappNumber: '(41)9 9999-1102',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cigana',
                subtitle: 'Cartomante'
            })
        
        tituloProfissional = res6.body.content

        //cria o profissional
        const res7 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional = res7.body.content
        console.log('profissional - '+profissional)
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 24, 8, 0).toString()),
                isAvaiable: true
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Cria registro com mesma idProfissional porém com schedulingTime diferente', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 24, 8, 30).toString()),
                isAvaiable: true
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar um novo horário com mesmo IdProfessional e um schedulingTime já cadastrado', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 24, 8, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro com idProfessional e schedulingTime igual a 0.', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: 0,
                schedulingTime: 0,
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.schedulingTime')
    })

    it('Tenta criar registro com idProfessional e schedulingTime sendo negativo', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: -1,
                schedulingTime: -1,
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.schedulingTime')
    })

    it('Tenta criar registro com idProfessional, schedulingTime e isAvaiable sendo strings', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional:'Hosana Cartomante',
                schedulingTime: new Date(2024, 5, 24, 9, 0).toString(),
                isAvaiable: 'Disponível'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.schedulingTime')
        expect(resposta.body).toHaveProperty('errors.body.isAvaiable')
    })

    it('Tenta criar um registro com idProfessional invalido', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: 999,
                schedulingTime: Date.parse(new Date(2024, 5, 24, 9, 0).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/horarios')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})