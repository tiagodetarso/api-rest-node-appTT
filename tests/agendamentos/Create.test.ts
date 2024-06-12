import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Agendamentos - Create', () => {

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
    let horario2: number | undefined = undefined
    let horario3: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined
    let statusPagamento: number | undefined = undefined
    let status: number | undefined = undefined


    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Irati',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Comunidade'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro do profissional
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Polacão'
            })
        
        logradouro1 = res3.body.content

        //cria logradouro do cliente
        const res4 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Pinhão Maduro',
            })
        
        logradouro2 = res4.body.content

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro1,
                number: 20,
                neighborhood: 'Nova Polônia'
            })
        
        endereco1 = res5.body.content

        const res6 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro2,
                number: 145,
                neighborhood: 'Fruto das Araucárias'
            })
        
        endereco2 = res6.body.content

        //cria pessoa do profissional
        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco1,
                name: 'Thomás',
                lastName: 'Turbano',
                email: 'tturbano@gmail.com',
                phoneNumber: '(41) 9 9999-1113',
                whatsappNumber: '(41) 9 9999-1114',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa1 = res7.body.content

        //cria pessoa do cliente
        const res8 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco2,
                name: 'Mara',
                lastName: 'Vilhosa',
                email: 'mvilhosa@narede.com.br',
                phoneNumber: '(44) 9 9999-1115',
                whatsappNumber: '(44) 9 9999-1116',
                registrationDate: Date.parse(new Date().toString()),
                password: 'abc123',
            })
        
        pessoa2 = res8.body.content

        //cria o título profissional
        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Psicanalista',
                subtitle: 'Escola Freudiana'
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
                dateOfBirth: Date.parse(new Date(1980, 5, 12).toString())
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

        const res17 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 13, 9, 0).toString()),
                isAvaiable: true
            })

        horario2 = res17.body.content

        const res18 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 14, 9, 0).toString()),
                isAvaiable: true
            })

        horario3 = res18.body.content

        //cria serviço
        const res13 = await testServer.post('/servicos')
            .send({
                name: 'Sessão de psicanálise',
                genericDescription: 'Psicanálise - 50 min'
            })
        
        servico = res13.body.content


        //cria o serviço prestado
        const res14 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 200
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
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario1,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Cria registro com mesmos idClient, idProfissional e idServicoPrestado, porém com idHorario diferente', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario2,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

    it('Tenta criar um novo agendamento com mesmos IdClient, idHorario, de um agendamento já cadastrado', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario2,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro com todos os ids e professionalAvaliation iguais a 0.', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: 0,
                idClient: 0,
                idHorario: 0,
                idServicoPrestado: 0,
                idStatus: 0,
                idPaymentStatus: 0,
                professionalAvaliation: 0,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idClient')
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.idHorario')
        expect(resposta.body).toHaveProperty('errors.body.idServicoPrestado')
        expect(resposta.body).toHaveProperty('errors.body.idStatus')
        expect(resposta.body).toHaveProperty('errors.body.idPaymentStatus')
        expect(resposta.body).toHaveProperty('errors.body.professionalAvaliation')
    })

    it('Tenta criar registro com todos os ids sendo negativos e professionalAvaliation sendo maior que 6', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: -2,
                idClient: -1,
                idHorario: -3,
                idServicoPrestado: -4,
                idStatus: -5,
                idPaymentStatus: -6,
                professionalAvaliation: 7,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idClient')
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.idHorario')
        expect(resposta.body).toHaveProperty('errors.body.idServicoPrestado')
        expect(resposta.body).toHaveProperty('errors.body.idStatus')
        expect(resposta.body).toHaveProperty('errors.body.idPaymentStatus')
        expect(resposta.body).toHaveProperty('errors.body.professionalAvaliation')
    })

    it('Tenta criar registro com todos os ids e professionalAvaliation sendo strings', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: 'Dra. Maracutaia',
                idClient: 'Tião',
                idHorario: 'O de sempre',
                idServicoPrestado: 'Consulta me engana que eu gosto',
                idStatus: 'Agendado',
                idPaymentStatus: 'Devedor',
                professionalAvaliation: 'Nota 10',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.idClient')
        expect(resposta.body).toHaveProperty('errors.body.idProfessional')
        expect(resposta.body).toHaveProperty('errors.body.idHorario')
        expect(resposta.body).toHaveProperty('errors.body.idServicoPrestado')
        expect(resposta.body).toHaveProperty('errors.body.idStatus')
        expect(resposta.body).toHaveProperty('errors.body.idPaymentStatus')
        expect(resposta.body).toHaveProperty('errors.body.professionalAvaliation')

    })

    it('Tenta criar um registro com idClient inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: 999,
                idHorario: horario3,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idProfessional inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: 999,
                idClient: cliente,
                idHorario: horario3,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idHorario inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: 999,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idServicoPrestado inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario3,
                idServicoPrestado: 999,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idStatus inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario3,
                idServicoPrestado: servicoPrestado,
                idStatus: 999,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar um registro com idPaymentStatus inválido', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente,
                idHorario: horario3,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: 999,
                professionalAvaliation: 6,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro vazio, ou seja, enviando um objeto vazio', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body')
    })
})