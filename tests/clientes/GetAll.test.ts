import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let pessoa3: number | undefined = undefined
    let cliente: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Tangará da Serra',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Estrada Vicinal'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Mistério do Mato',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 7863,
                neighborhood: 'Jardim Serrano'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Uvinaldo',
                lastName: 'Vinhudo',
                email: 'uvinhudo@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa = res5.body.content

        const res6 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Larissa',
                lastName: 'Emauele',
                email: 'lemanuele@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa2 = res6.body.content

        const res7 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Shirley',
                lastName: 'de Hahaha Raio Laser',
                email: 'shrlaser@gmail.com',
                phoneNumber: '(54)9 9999-9999',
                whatsappNumber: '(54)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa3 = res7.body.content

        const res8 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        cliente = res8.body.content

        await testServer.post('/clientes')
            .send({
                idPessoa: pessoa2,
                genderId: 'Mulher Heterossexual',
                dateOfBirth: Date.parse(new Date(1995, 3, 1).toString())
            })

        await testServer.post('/clientes')
            .send({
                idPessoa: pessoa3,
                genderId: 'Mulher Transsexual',
                dateOfBirth: Date.parse(new Date(1986, 10, 21).toString())
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/clientes')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterDateOfBirthLowerLimit, filterDateOfBirthHigherLimit e req.query.id', async() => {

        const resposta = await testServer
            .get(`/clientes/?filterDateOfBirthLowerLimit=${Date.parse(new Date(1994, 1, 1).toString())}&filterDateOfBirthHigherLimit=${Date.parse(new Date(1996, 1, 1).toString())}&id=${cliente}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterIdPessoa', async() => {
        
        const resposta = await testServer
            .get(`/clientes/?filterIdPessoa=${pessoa3}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toEqual(1)
    })
    
    it('Pesquisa com filterDateOfBirthLowerLimit', async() => {
        
        const resposta = await testServer
            .get(`/clientes/?filterDateOfBirthHigherLimit=${Date.parse(new Date(2000, 1, 1).toString())}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(2)
    })

    it('Pesquisa com filterDateOfBirthHigher.Limit', async() => {
        
        const resposta = await testServer
            .get(`/clientes/?filterDateOfBirthLowerLimit=${Date.parse(new Date(1980, 1, 1).toString())}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(2)
    })

    it('Pesquisa com todos os filtros sendo zero', async() => {
        
        const resposta = await testServer
            .get('/clientes/?filterDateOfBirthLowerLimit=0&filterDateOfBirthHigherLimit=0&filterIdPessoa=0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthLowerLimit')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthHigherLimit')
    })

    it('Pesquisa com todos os filtros sendo negativos', async() => {
        
        const resposta = await testServer
            .get('/clientes/?filterDateOfBirthLowerLimit=-1&filterDateOfBirthHigherLimit=-1&filterIdPessoa=-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthLowerLimit')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthHigherLimit')
    })

    it('Pesquisa com todos os filtros sendo strings', async() => {
        
        const resposta = await testServer
            .get('/clientes/?filterDateOfBirthLowerLimit=a&filterDateOfBirthHigherLimit=b&filterIdPessoa=c')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdPessoa')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthLowerLimit')
        expect(resposta.body).toHaveProperty('errors.query.filterDateOfBirthHigherLimit')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/clientes/?page=a')
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