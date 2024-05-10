import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let endereco2: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let tituloProfissional2: number | undefined = undefined
    let profissional: number | undefined = undefined

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

        const res10 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })

        profissional = res10.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/profissionais/${profissional}`)
            .send({
                idPessoa: pessoa2,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco2,
                isActive: false
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')

        const resVerificar = await testServer
            .get(`/profissionais/${profissional}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idPessoa).toEqual(pessoa2)
        expect(resVerificar.body.idProfessionalTitle).toEqual(tituloProfissional2)
        expect(resVerificar.body.serviceAddress).toEqual(endereco2)
        expect(resVerificar.body.isActive).toEqual(Number(false))
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/profissionais/999')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com isActive do tipo string', async() => {

        const resposta = await testServer
            .put(`/profissionais/${profissional}`)
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: 't'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.isActive')
    })

    it('Tenta atualizar registro com idPessoa inexistente', async() => {

        const resposta = await testServer
            .put(`/profissionais/${profissional}`)
            .send({
                idPessoa: 999,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com idProfessionalTitle inexistente', async() => {

        const resposta = await testServer
            .put(`/profissionais/${profissional}`)
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: 999,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    it('Tenta atualizar registro com serviceAddress inexistente', async() => {

        const resposta = await testServer
            .put(`/profissionais/${profissional}`)
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: 999,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/profissionais/0')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/profissionais/1.1')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/profissionais/1,1')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/profissionais/-1')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})