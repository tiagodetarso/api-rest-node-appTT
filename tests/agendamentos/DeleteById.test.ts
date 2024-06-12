import { StatusCodes } from 'http-status-codes'

import { testServer } from '../jest.setup'

describe('Enderecos - DeleteById', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro1: number | undefined = undefined
    let logradouro2: number | undefined = undefined
    let endereco1: number | undefined = undefined
    let endereco2: number | undefined = undefined
    let pessoa1: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let cliente: number | undefined = undefined
    let profissional: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let horario1: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined
    let statusPagamento: number | undefined = undefined
    let status: number | undefined = undefined
    let agendamento: number | undefined = undefined


    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'São Miguel do Iguaçu',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Conjunto'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro do profissional
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Cataratas'
            })
        
        logradouro1 = res3.body.content

        //cria logradouro do cliente
        const res4 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Itaipu',
            })
        
        logradouro2 = res4.body.content

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro1,
                number: 1300,
                neighborhood: 'Caminhos do Iguaçu'
            })
        
        endereco1 = res5.body.content

        const res6 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro2,
                number: 5750,
                neighborhood: 'Represa'
            })
        
        endereco2 = res6.body.content

        //cria pessoa do profissional
        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco1,
                name: 'Simas',
                lastName: 'Turbo',
                email: 'sturbo@gmail.com',
                phoneNumber: '(41) 9 9999-1120',
                whatsappNumber: '(41) 9 9999-1121',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa1 = res7.body.content

        //cria pessoa do cliente
        const res8 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco2,
                name: 'Inês',
                lastName: 'Quecível',
                email: 'iquecivel@narede.com.br',
                phoneNumber: '(44) 9 9999-1122',
                whatsappNumber: '(44) 9 9999-1123',
                registrationDate: Date.parse(new Date().toString()),
                password: 'abc123',
            })
        
        pessoa2 = res8.body.content

        //cria o título profissional
        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Médico(a)',
                subtitle: 'Medicina Alternativa (Ayurveda)'
            })
        
        tituloProfissional = res9.body.content

        //cria o profissional
        const res10 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa1,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco1,
                isActive: true
            })

        profissional = res10.body.content

        //cria cliente
        const res11 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa2,
                genderId: 'Mulher Cis',
                dateOfBirth: Date.parse(new Date(1977, 5, 12).toString())
            })

        cliente = res11.body.content

        //cria o horario
        const res12 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 12, 9, 0).toString()),
                isAvaiable: true
            })

        horario1 = res12.body.content

        //cria serviço
        const res13 = await testServer.post('/servicos')
            .send({
                name: 'Sessão de Avaliação',
                genericDescription: 'Investigação relacionada aos gunas e ao equilíbrio dos xakras'
            })
        
        servico = res13.body.content


        //cria o serviço prestado
        const res14 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 250
            })
        
        servicoPrestado = res14.body.content

        //cria o status de Pagamento
        const res15 = await testServer.post('/statuspagamento')
            .send({
                status: 'Serviço agendado',
            })
        
        statusPagamento = res15.body.content

        // cria status
        const res16 = await testServer.post('/statusagendamento')
            .send({
                status: 'Agendamento confirmado',
            })
        
        status = res16.body.content

        const res17 = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario1,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        agendamento = res17.body.content
    })


    it('Apaga registro', async() => {
        const resposta = await testServer
            .delete(`/agendamentos/${agendamento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')
    })

    it('Tenta apagar registro inexistente', async() => {
        const resposta = await testServer
            .delete('/agendamentos/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta apagar registro sem req.params.id', async() => {
        const resposta = await testServer
            .delete('/agendamentos')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta apagar registro com req.params.id do tipo string', async() => {
        const resposta = await testServer
            .delete('/agendamentos/a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id igual a zero', async() => {
        const resposta = await testServer
            .delete('/agendamentos/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com ponto', async() => {
        const resposta = await testServer
            .delete('/agendamentos/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id não inteiro com vírgula', async() => {
        const resposta = await testServer
            .delete('/agendamentos/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta apagar registro com req.params.id negativo', async() => {
        const resposta = await testServer
            .delete('/agendamentos/-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})