import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro1: number | undefined = undefined
    let logradouro2: number | undefined = undefined
    let endereco1: number | undefined = undefined
    let endereco2: number | undefined = undefined
    let pessoa1: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let pessoa3: number | undefined = undefined
    let cliente1: number | undefined = undefined
    let cliente2: number | undefined = undefined
    let profissional: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let horario1: number | undefined = undefined
    let horario2: number | undefined = undefined
    let horario3: number | undefined = undefined
    let servico: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined
    let statusPagamento1: number | undefined = undefined
    let statusPagamento2: number | undefined = undefined
    let statusPagamento3: number | undefined = undefined
    let status1: number | undefined = undefined
    let status2: number | undefined = undefined
    let status3: number | undefined = undefined
    let agendamento: number | undefined = undefined


    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Ventania',
                state: 'PR'
            })

        municipio = res1.body.content
        console.log('municipio - '+municipio)

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Enseada'
            })
        
        tipoLogradouro = res2.body.content
        console.log('tipoLogradouro - '+tipoLogradouro)

        //cria logradouro do profissional
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Ventos Uivantes'
            })
        
        logradouro1 = res3.body.content
        console.log('logradouro1 - '+logradouro1)

        //cria logradouro do cliente
        const res4 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Brisa Alegre',
            })
        
        logradouro2 = res4.body.content
        console.log('logradouro2 - '+logradouro2)

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro1,
                number: 2500,
                neighborhood: 'Jardim Leste'
            })
        
        endereco1 = res5.body.content
        console.log('endereco1 - '+endereco1)

        const res6 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro2,
                number: 135,
                neighborhood: 'Forte Lufada'
            })
        
        endereco2 = res6.body.content
        console.log('endereco2 - '+endereco2)


        //cria pessoa do profissional
        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco1,
                name: 'Bete',
                lastName: 'Balanço',
                email: 'bbalanco@gmail.com',
                phoneNumber: '(41) 9 9999-1132',
                whatsappNumber: '(41) 9 9999-1133',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa1 = res7.body.content
        console.log('pessoa1 - '+pessoa1)

        //cria pessoa do cliente
        const res8 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco2,
                name: 'takakara',
                lastName: 'Nomuro',
                email: 'tnomuro@narede.com.br',
                phoneNumber: '(44) 9 9999-1134',
                whatsappNumber: '(44) 9 9999-1135',
                registrationDate: Date.parse(new Date().toString()),
                password: 'abc123',
            })
        
        pessoa2 = res8.body.content
        console.log('pessoa2 - '+pessoa2)

        const res25 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco2,
                name: 'Marco',
                lastName: 'Libri',
                email: 'mlibri@narede.com.br',
                phoneNumber: '(44) 9 9999-1136',
                whatsappNumber: '(44) 9 9999-1137',
                registrationDate: Date.parse(new Date().toString()),
                password: 'abc123',
            })
        
        pessoa3 = res25.body.content
        console.log('pessoa3 - '+pessoa3)

        //cria o título profissional
        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Acompanhante Executiva',
                subtitle: 'Garota de Programa'
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
        console.log('profissional - '+profissional)

        //cria cliente
        const res11 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa2,
                genderId: 'Homem Cis',
                dateOfBirth: Date.parse(new Date(1983, 9, 25).toString())
            })

        cliente1 = res11.body.content
        console.log('cliente1 - '+cliente1)

        const res24 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa3,
                genderId: 'Homem Cis',
                dateOfBirth: Date.parse(new Date(1986, 10, 5).toString())
            })

        cliente2 = res24.body.content
        console.log('cliente2 - '+cliente2)

        //cria o horario
        const res12 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 15, 9, 0).toString()),
                isAvaiable: true
            })

        horario1 = res12.body.content
        console.log('horario1 - '+horario1)

        const res18 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 22, 10, 30).toString()),
                isAvaiable: true
            })

        horario2 = res18.body.content
        console.log('horario2 - '+horario2)

        const res21 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 29, 15, 0).toString()),
                isAvaiable: true
            })

        horario3 = res21.body.content
        console.log('horario3 - '+horario3)

        //cria serviço
        const res13 = await testServer.post('/servicos')
            .send({
                name: 'Serviços sexuais completo',
                genericDescription: 'Oral, vaginal e anal - 1 hora'
            })
        
        servico = res13.body.content
        console.log('servico - '+servico)

        //cria o serviço prestado
        const res14 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 250
            })
        
        servicoPrestado = res14.body.content
        console.log('servicoPrestado - '+servicoPrestado)

        //cria o status de Pagamento
        const res15 = await testServer.post('/statuspagamento')
            .send({
                status: 'Serviço agendado',
            })
        
        statusPagamento1 = res15.body.content
        console.log('statusPagamento1 - '+statusPagamento1)

        const res19 = await testServer.post('/statuspagamento')
            .send({
                status: 'Cliente Indica o Pagamento',
            })
        
        statusPagamento2 = res19.body.content
        console.log('statusPagamento2 - '+statusPagamento2)

        const res22 = await testServer.post('/statuspagamento')
            .send({
                status: 'Pagamento confirmado pelo profissional',
            })
        
        statusPagamento3 = res22.body.content
        console.log('statusPagamento3 - '+statusPagamento3)

        // cria status
        const res16 = await testServer.post('/statusagendamento')
            .send({
                status: 'Agendamento Cancelado pelo Cliente',
            })
        
        status1 = res16.body.content
        console.log('status1 - '+status1)

        const res20 = await testServer.post('/statusagendamento')
            .send({
                status: 'Atendimento Realizado ',
            })
        
        status2 = res20.body.content
        console.log('status2 - '+status2)

        const res23 = await testServer.post('/statusagendamento')
            .send({
                status: 'Atendimento Cancelado pelo Profissional',
            })
        
        status3 = res23.body.content
        console.log('status3 - '+status3)

        const res17 = await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente1,
                idHorario: horario1,
                idServicoPrestado: servicoPrestado,
                idStatus: status1,
                idPaymentStatus: statusPagamento1,
                professionalAvaliation: 6,
            })
        
        agendamento = res17.body.content
        console.log('agendamento - '+agendamento)

        await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente1,
                idHorario: horario2,
                idServicoPrestado: servicoPrestado,
                idStatus: status2,
                idPaymentStatus: statusPagamento2,
                professionalAvaliation: 6,
            })

        await testServer.post('/agendamentos')
            .send({
                idProfessional: profissional,
                idClient: cliente2,
                idHorario: horario3,
                idServicoPrestado: servicoPrestado,
                idStatus: status3,
                idPaymentStatus: statusPagamento3,
                professionalAvaliation: 6,
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/agendamentos')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toEqual(3)
    })

    it('Pesquisa com todos os filtros e req.query.id', async() => {

        const resposta = await testServer
            .get(`/agendamentos/?filterIdProfessional=${profissional}&filterIdClient=${cliente1}&filterIdHorario=${horario2}&filterIdStatus=${status2}&filterIdPaymentStatus=${statusPagamento2}&id=${agendamento}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterIdProfissional', async() => {
        
        const resposta = await testServer
            .get(`/agendamentos/?filterIdProfessional=${profissional}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toEqual(3)
    })

    it('Pesquisa com filterIdClient', async() => {
        
        const resposta = await testServer
            .get(`/agendamentos/?filterIdClient=${cliente1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toEqual(2)
    })

    it('Pesquisa com filterIdHorario', async() => {
        
        const resposta = await testServer
            .get(`/agendamentos/?filterIdHorario=${horario3}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toEqual(1)
    })

    it('Pesquisa com filterIdStatus', async() => {
        
        const resposta = await testServer
            .get(`/agendamentos/?filterIdStatus=${status2}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toEqual(1)
    })

    it('Pesquisa com filterIdPaymentStatus', async() => {
        
        const resposta = await testServer
            .get(`/agendamentos/?filterIdPaymentStatus=${statusPagamento1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toEqual(1)
    })
    
    it('Pesquisa com todos os filtros sendo zero', async() => {
        
        const resposta = await testServer
            .get('/agendamentos/?filterIdProfessional=0&filterIdClient=0&filterIdHorario=0&filterIdStatus=0&filterIdPaymentStatus=0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterIdClient')
        expect(resposta.body).toHaveProperty('errors.query.filterIdHorario')
        expect(resposta.body).toHaveProperty('errors.query.filterIdStatus')
        expect(resposta.body).toHaveProperty('errors.query.filterIdPaymentStatus')
    })

    it('Pesquisa com todos os filtros sendo negativos', async() => {
        
        const resposta = await testServer
            .get('/agendamentos/?filterIdProfessional=-1&filterIdClient=-1&filterIdHorario=-1&filterIdStatus=-1&filterIdPaymentStatus=-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterIdClient')
        expect(resposta.body).toHaveProperty('errors.query.filterIdHorario')
        expect(resposta.body).toHaveProperty('errors.query.filterIdStatus')
        expect(resposta.body).toHaveProperty('errors.query.filterIdPaymentStatus')
    })

    it('Pesquisa com todos os filtros sendo strings', async() => {
        
        const resposta = await testServer
            .get('/agendamentos/?filterIdProfessional=e&filterIdClient=d&filterIdHorario=c&filterIdStatus=b&filterIdPaymentStatus=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterIdClient')
        expect(resposta.body).toHaveProperty('errors.query.filterIdHorario')
        expect(resposta.body).toHaveProperty('errors.query.filterIdStatus')
        expect(resposta.body).toHaveProperty('errors.query.filterIdPaymentStatus')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/agendamentos/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/enderecos/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})