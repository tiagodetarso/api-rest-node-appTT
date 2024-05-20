import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let tituloProfissional2: number | undefined = undefined
    let profissional: number | undefined = undefined
    let profissional2: number | undefined = undefined
    let servico: number | undefined = undefined
    let servico2: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Porto Rico',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Porto'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Paraná',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 3,
                neighborhood: 'Margem'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Carlos',
                lastName: 'Dubroviny',
                email: 'cdubro@gmail.com',
                phoneNumber: '(41)9 9999-0701',
                whatsappNumber: '(41)9 9999-0702',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        const res12 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Geovana',
                lastName: 'Braga',
                email: 'geobraga@gmail.com',
                phoneNumber: '(41)9 9999-0801',
                whatsappNumber: '(41)9 9999-0802',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa2 = res12.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Professor Particular',
                subtitle: 'Matemática'
            })
        
        tituloProfissional = res6.body.content

        const res13 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Professor Particular',
                subtitle: 'Português'
            })
        
        tituloProfissional2 = res13.body.content
        
        //cria o profissional
        const res7 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional = res7.body.content

        const res8 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa2,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional2 = res8.body.content
        
        //cria serviço
        const res9 = await testServer.post('/servicos')
            .send({
                name: 'Aula Particular',
                genericDescription: 'Matemática'
            })
        
        servico = res9.body.content

        const res10 = await testServer.post('/servicos')
            .send({
                name: 'Aula Particular',
                genericDescription: 'Português'
            })
        
        servico2 = res10.body.content

        const res11 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        servicoPrestado = res11.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/servicosprestados/${servicoPrestado}`)
            .send({
                idServico: servico2,
                idProfessional: profissional2,
                specificDescription: 'Duração - 45 minutos',
                price: 80
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')

        const resVerificar = await testServer
            .get(`/servicosprestados/${servicoPrestado}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idServico).toEqual(servico2)
        expect(resVerificar.body.idProfessional).toEqual(profissional2)
        expect(resVerificar.body.specificDescription).toEqual('Duração - 45 minutos')
        expect(resVerificar.body.price).toEqual(80)
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/servicosprestados/999')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com price do tipo string', async() => {

        const resposta = await testServer
            .put(`/servicosprestados/${servicoPrestado}`)
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 'setenta e cinco',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.price')
    })

    it('Tenta atualizar registro com idServico inexistente', async() => {

        const resposta = await testServer
            .put(`/servicosprestados/${servicoPrestado}`)
            .send({
                idServico: 999,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com idProfessiona inexistente', async() => {

        const resposta = await testServer
            .put(`/servicosprestados/${servicoPrestado}`)
            .send({
                idServico: servico,
                idProfessional: 999,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    it('Tenta atualizar registro com specificDescription com menos de 5 caracteres', async() => {

        const resposta = await testServer
            .put(`/servicosprestados/${servicoPrestado}`)
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Dura',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.specificDescription')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/servicosprestados/0')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/servicosprestados/1.1')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/servicosprestados/1,1')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/servicosprestados/-1')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Duração de 1 hora',
                price: 75,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})