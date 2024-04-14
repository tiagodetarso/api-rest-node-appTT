import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Agendamentos - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro1: number | undefined = undefined
    let logradouro2: number | undefined = undefined
    let pessoa1: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let cliente: number | undefined = undefined
    let profissional: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let horario: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined
    let statusPagamento: number | undefined = undefined
    let status: number | undefined = undefined


    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Astorga',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro do profissional
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'José Mendes Rodrigues',
                number: 45,
                neighborhood: 'Jardim Lice I'
            })
        
        logradouro1 = res3.body.content

        //cria logradouro do cliente
        const res4 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'das Flores',
                number: 157,
                neighborhood: 'Centro'
            })
        
        logradouro2 = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idPublicPlace: logradouro1,
                name: 'Tiago de Tarso',
                lastName: 'Raggiotto Gonçalves',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41) 9 9909-8911',
                whatsappNumber: '(41) 9 9909-8911',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa1 = res5.body.content

        //cria pessoa do cliente
        const res6 = await testServer.post('/cadastrar')
            .send({
                idPublicPlace: logradouro2,
                name: 'Fulano',
                lastName: 'de Tal',
                email: 'fulano@narede.com.br',
                phoneNumber: '(44) 3214-3333',
                whatsappNumber: '(44) 9 9999-9999',
                registrationDate: new Date(),
                password: 'abc123',
            })
        
        pessoa2 = res6.body.content

        //cria o título profissional
        const res7 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Especializado em corte masculino'
            })
        
        tituloProfissional = res7.body.content

        //cria o profissional
        const res8 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa1,
                idProfessionalTitle: tituloProfissional,
                isActive: true
            })

        profissional = res8.body.content

        //cria cliente
        const res9 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa2,
                genderId: 'Homem Heterossexual',
                dateOfBirth: new Date(1980, 5, 12)
            })

        cliente = res9.body.content

        //cria o horario
        const res10 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: new Date(2023, 10, 31),
                isAvaiable: true
            })

        horario = res10.body.content

        //cria serviço
        const res11 = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Corte de cabelo, de acordo com a preferência do cliente, ' 
                    +'utiliando tecnicas especializadas, instrumentos de qualidade e produtos adequados. '
                    +'Inclui lavagem.'
            })
        
        servico = res11.body.content

        //cria o serviço prestado
        const res12 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 30,
            })
        
        servicoPrestado = res12.body.content

        //cria o status de Pagamento
        const res13 = await testServer.post('/statuspagamento')
            .send({
                status: 'Cobrado pelo profissional',
            })
        
        statusPagamento = res13.body.content

        // cria status
        const res14 = await testServer.post('/statusagendamento')
            .send({
                status: 'Solicitado pelo cliente',
            })
        
        status = res14.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/agendamentos')
            .send({
                idClient: cliente,
                idProfessional: profissional,
                idHorario: horario,
                idServicoPrestado: servicoPrestado,
                idStatus: status,
                idPaymentStatus: statusPagamento,
                professionalAvaliation: 4,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

})