import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Serviços Prestados - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let servico: number | undefined = undefined
    let servico2: number | undefined = undefined
    let servico3: number | undefined = undefined
    let profissional: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'São José dos Pinhais',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rodovia'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'BR-277',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 10278,
                neighborhood: 'Afonso Pena'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Germano',
                lastName: 'Brasil',
                email: 'gebrasil@gmail.com',
                phoneNumber: '(41)9 9999-0201',
                whatsappNumber: '(41)9 9999-0202',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Medico(a)',
                subtitle: 'Ortopedista'
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
        
        //cria serviço
        const res8 = await testServer.post('/servicos')
            .send({
                name: 'Consulta',
                genericDescription: 'Para diagnóstico'
            })
        
        servico = res8.body.content

        const res9 = await testServer.post('/servicos')
            .send({
                name: 'Cirurgia',
                genericDescription: 'Joelho'
            })
        
        servico2 = res9.body.content

        const res10 = await testServer.post('/servicos')
            .send({
                name: 'Retorno',
                genericDescription: 'Consulta de retorno'
            })
        
        servico3 = res10.body.content
    })

    it('Criar registro', async () => {

        //cria o serviço prestado
        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Qualquer coisa aqui',
                price: 250,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
    it('Cria registro com mesma idProfessional porém idServico diferente', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico2,
                idProfessional: profissional,
                specificDescription: 'Qualquer coisa aqui',
                price: 10000,
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Cria novo registro sem enviar specificDescription e com price sendo um double', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico3,
                idProfessional: profissional,
                price: 150.35,
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar servico prestado para profissional que já possui este servico cadastrado como serviço prestado', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Qualquer coisa aqui',
                price: 250,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro com idProfessional, idServico e price iguais a 0; e specificDescription com menos de 5 caracteres', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: 0,
                idProfessional: 0,
                specificDescription: 'Blah',
                price: 0,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.idServico')
        expect(resposta.body).toHaveProperty('errors.body.specificDescription')
        expect(Object.values(resposta.body.errors.body).length).toEqual(3)
    })

    it('Tenta criar registro com idProfessional, idServico e price negativos; e specificDescription com mais de 200 caracteres', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: -1,
                idProfessional: -1,
                specificDescription: 'Aqui, neste local, o profissional poderá descrever o serviço que presta com suas próprias palavras, dando informações mais detalhadas sobre atendimento e procedimentos, além de outras informações que julgue necessárias',
                price: -1,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.idServico')
        expect(resposta.body).toHaveProperty('errors.body.specificDescription')
        expect(resposta.body).toHaveProperty('errors.body.price')
    })

    it('Tenta criar registro com idServico, idProfessional e price sendo strings', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: 'Consulta de Retorno',
                idProfessional: 'Arlindo Cruz',
                specificDescription: 'Blah blah blah',
                price: 'Trezentos Reais',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idServico')
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.price')
    })

    it('Tenta criar um registro com idServico invalido', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: 999,
                idProfessional: profissional,
                specificDescription: 'Qualquer coisa aqui',
                price: 250,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idProfessional invalido', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: 999,
                specificDescription: 'Qualquer coisa aqui',
                price: 250,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/servicosprestados')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})