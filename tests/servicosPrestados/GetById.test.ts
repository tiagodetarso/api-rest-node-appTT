import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetById', () =>{

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
                name: 'Apiaí',
                state: 'SP'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Jumento Clementino',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 732,
                neighborhood: 'Boa Vista'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Orlando',
                lastName: 'Murtinho',
                email: 'omurtinho@gmail.com',
                phoneNumber: '(41)9 9999-0601',
                whatsappNumber: '(41)9 9999-0602',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Unisex'
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
                name: 'Corte de Cabelo',
                genericDescription: 'Masculino'
            })
        
        servico = res8.body.content

        const res9 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                price: 35,
            })
        
        servicoPrestado = res9.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/servicosprestados/${servicoPrestado}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('idServico')
        expect(resposta.body).toHaveProperty('idProfessional')
        expect(resposta.body).toHaveProperty('price')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/servicosprestados/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/servicosprestados/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/servicosprestados/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/servicosprestados/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/servicosprestados/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo negativo', async() => {
        const resposta = await testServer
            .get('/servicosprestados/-2')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})