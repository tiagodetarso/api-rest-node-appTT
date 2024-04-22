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
    let horario: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined
    let statusPagamento: number | undefined = undefined
    let status: number | undefined = undefined


    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Maringá',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Avenida'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro do profissional
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                name: 'Pedro Taques'
            })
        
        logradouro1 = res3.body.content

        //cria logradouro do cliente
        const res4 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                name: 'Brasil',
            })
        
        logradouro2 = res4.body.content

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro1,
                idCity: municipio,
                number: 1455,
                neighborhood: 'Zona 20'
            })
        
        endereco1 = res5.body.content

        const res6 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro2,
                idCity: municipio,
                number: 2450,
                neighborhood: 'Zona 05'
            })
        
        endereco2 = res6.body.content

        //cria pessoa do profissional
        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco1,
                name: 'José',
                lastName: 'de Paula',
                email: 'zepaula@gmail.com',
                phoneNumber: '(41) 9 9999-0011',
                whatsappNumber: '(41) 9 9999-0012',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa1 = res7.body.content

        //cria pessoa do cliente
        const res8 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco2,
                name: 'Cirano',
                lastName: 'de Bergerac',
                email: 'Cirgerac@narede.com.br',
                phoneNumber: '(44) 3214-3333',
                whatsappNumber: '(44) 9 9999-00013',
                registrationDate: new Date(),
                password: 'abc123',
            })
        
        pessoa2 = res8.body.content

        //cria o título profissional
        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Médico',
                subtitle: 'Generalista'
            })
        
        tituloProfissional = res9.body.content

        //cria o profissional
        const res10 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa1,
                idProfessionalTitle: tituloProfissional,
                isActive: true
            })

        profissional = res10.body.content

        //cria cliente
        const res11 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa2,
                genderId: 'Homem Cis',
                dateOfBirth: new Date(1980, 5, 12)
            })

        cliente = res11.body.content

        //cria o horario
        const res12 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: new Date(2024, 3, 23, 9, 0),
                isAvaiable: true
            })

        horario = res12.body.content

        //cria serviço
        const res13 = await testServer.post('/servicos')
            .send({
                name: 'Consulta Médica',
                genericDescription: 'CheckUp geral'
            })
        
        servico = res13.body.content

        //cria o serviço prestado
        const res14 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 150
            })
        
        servicoPrestado = res14.body.content

        //cria o status de Pagamento
        const res15 = await testServer.post('/statuspagamento')
            .send({
                status: 'Serviço ainda não foi prestado',
            })
        
        statusPagamento = res15.body.content

        // cria status
        const res16 = await testServer.post('/statusagendamento')
            .send({
                status: 'Agendamento confirmado pelo profissional',
            })
        
        status = res16.body.content
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