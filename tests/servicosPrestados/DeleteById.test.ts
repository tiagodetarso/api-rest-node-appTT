import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Enderecos - DeleteById', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Bocaiúva do Sul',
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
                idCity: municipio,
                name: 'da Uva',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 10278,
                neighborhood: 'Bocaiúvinha'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Ítalo',
                lastName: 'Brasiliano',
                email: 'ibra@gmail.com',
                phoneNumber: '(41)9 9999-0301',
                whatsappNumber: '(41)9 9999-0402',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Dentista',
                subtitle: 'Cirurgião'
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
                name: 'Cirurgia',
                genericDescription: 'Tratamento de Canal'
            })
        
        servico = res8.body.content

        const res9 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                price: 500,
            })
        
        servicoPrestado = res9.body.content
    })

    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/servicosprestados/${servicoPrestado}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/servicosprestados')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id negativo', async() => {
        const resposta = await testServer
            .delete('/servicosprestados/-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})