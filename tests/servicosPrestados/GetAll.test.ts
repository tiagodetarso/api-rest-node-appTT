import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined
    let servico: number | undefined = undefined
    let servico2: number | undefined = undefined
    let servico3: number | undefined = undefined
    let servicoPrestado: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Corbélia',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Avenida'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Brasil',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 1275,
                neighborhood: 'Centro'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Norma',
                lastName: 'Calixto',
                email: 'ncal@gmail.com',
                phoneNumber: '(41)9 9999-1001',
                whatsappNumber: '(41)9 9999-1002',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireira',
                subtitle: 'Cabelo Feminino'
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
                name: 'Corte',
                genericDescription: 'Corte de Cabelo Feminino'
            })
        
        servico = res8.body.content

        const res9 = await testServer.post('/servicos')
            .send({
                name: 'Luzes',
                genericDescription: 'Luzes em Mecha de Cabelo Feminino'
            })
        
        servico2 = res9.body.content
        console.log(servico2)

        const res10 = await testServer.post('/servicos')
            .send({
                name: 'Permanente',
                genericDescription: 'Permanente em Cabelo Feminino'
            })
        
        servico3 = res10.body.content

        const res11 = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Corte e lavagem',
                price: 65,
            })
        
        servicoPrestado = res11.body.content
        console.log(servicoPrestado)

        await testServer.post('/servicosprestados')
            .send({
                idServico: servico2,
                idProfessional: profissional,
                price: 90,
            })

        await testServer.post('/servicosprestados')
            .send({
                idServico: servico3,
                idProfessional: profissional,
                price: 100,
            })
    })


    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/servicosprestados')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com idServico e req.query.id', async() => {

        const resposta = await testServer
            .get(`/servicosprestados/?filterIdServico=${servico2}&id=${servicoPrestado}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterIdProfessional', async() => {
        
        const resposta = await testServer
            .get(`/servicosprestados/?filterIdProfessional=${profissional}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toEqual(3)
    })
    
    it('Pesquisa com filterLowerPrice', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterLowerPrice=95')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterHigherPrice', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterHigherPrice=65')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterHigherPrice e filterLowerPrice', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterHigherPrice=95&filterLowerPrice=70')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com todos os filtros sendo zero', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterIdServico=0&filterIdProfessional=0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdServico')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
    })

    it('Pesquisa com todos os filtros sendo negativos', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterIdServico=-1&filterIdProfessional=-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdServico')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
    })

    it('Pesquisa com todos os filtros sendo strings, inclusive filterLowerPrice e filterHigherPrice', async() => {
        
        const resposta = await testServer
            .get('/servicosprestados/?filterIdServico=a&filterIdProfessional=b&filterLowerPrice=c&filterHigherPrice=d')            
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdServico')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterLowerPrice')
        expect(resposta.body).toHaveProperty('errors.query.filterHigherPrice')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/servicosprestados/?page=a')
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