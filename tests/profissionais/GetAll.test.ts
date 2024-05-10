import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let endereco2: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let tituloProfissional2: number | undefined = undefined
    let profissional: number | undefined = undefined
    let profissional3: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Guaratuba',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Praia'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Central',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 75,
                neighborhood: 'Orla Guaratubana'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 250,
                neighborhood: 'Orla Guaratubana'
            })
        
        endereco2 = res5.body.content

        //cria pessoa do profissional
        const res6 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Arlindo',
                lastName: 'Natiruts',
                email: 'arnat@gmail.com',
                phoneNumber: '(41) 9 9999-0100',
                whatsappNumber: '(41) 9 9999-0100',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res6.body.content

        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Jamile',
                lastName: 'Natiruts',
                email: 'janat@gmail.com',
                phoneNumber: '(41) 9 9999-0101',
                whatsappNumber: '(41) 9 9999-0101',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa2 = res7.body.content

        //cria o título profissional
        const res8 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Psicólogo',
                subtitle: 'Comportamental'
            })
        
        tituloProfissional = res8.body.content

        const res9 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Médico',
                subtitle: 'Psiquiatra'
            })
        
        tituloProfissional2 = res9.body.content

        const res10 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })

        profissional = res10.body.content

        await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa2,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco2,
                isActive: true
            })

        const res11 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional2,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional3 = res11.body.content
        console.log(profissional3)
    })


    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/profissionais')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com idPessoa e req.query.id', async() => {

        const resposta = await testServer
            .get(`/profissionais/?filterIdPessoa=${pessoa2}&id=${profissional}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterIdProfessionalTitle', async() => {
        
        const resposta = await testServer
            .get(`/profissionais/?filterIdProfessionalTitle=${tituloProfissional2}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toEqual(2)
    })
    
    it('Pesquisa com filterServiceAdress', async() => {
        
        const resposta = await testServer
            .get(`/profissionais/?filterServiceAddress=${endereco}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(1)
    })

    it('Pesquisa com filterIsActive = false', async() => {
        
        const resposta = await testServer
            .get('/profissionais/?filterIsActive=false')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(0)
        expect(Number(resposta.header['x-total-count'])).toEqual(0)
    })

    it('Pesquisa com todos os filtros sendo zero', async() => {
        
        const resposta = await testServer
            .get('/profissionais/?filterIdPessoa=0&filterIdProfessionalTitle=0&filterServiceAddress=0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.query.filterServiceAddress')
    })

    it('Pesquisa com todos os filtros sendo negativos', async() => {
        
        const resposta = await testServer
            .get('/profissionais/?filterIdPessoa=-1&filterIdProfessionalTitle=-1&filterServiceAddress=-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.query.filterServiceAddress')
    })

    it('Pesquisa com todos os filtros sendo strings, inclusive filterIsActive', async() => {
        
        const resposta = await testServer
            .get('/profissionais/?filterIdPessoa=a&filterIdProfessionalTitle=b&filterServiceAddress=c&filterIsActive=d')            
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessionalTitle')
        expect(resposta.body).toHaveProperty('errors.query.filterServiceAddress')
        expect(resposta.body).toHaveProperty('errors.query.filterIsActive')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/profissionais/?page=a')
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