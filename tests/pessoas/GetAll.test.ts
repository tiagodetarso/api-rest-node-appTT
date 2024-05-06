import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'São José dos Pinhais',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Aeroporto'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'Afonso Pena',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 236,
                neighborhood: 'Vila Aeroporto'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Umberto',
                lastName: 'Paschetto',
                email: 'upaschetto@gmail.com',
                phoneNumber: '(41)8 8888-8888',
                whatsappNumber: '(41)8 8888-8888',
                registrationDate: new Date(),
                password: '123abc'
            })

        pessoa = res5.body.content

        await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Genésio',
                lastName: 'Honorato',
                email: 'ghonorato@gmail.com',
                phoneNumber: '(41)7 7777-7777',
                whatsappNumber: '(41)7 7777-7777',
                registrationDate: new Date(),
                password: '123abc'
            })

        await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Flávio',
                lastName: 'Pincel',
                email: 'fpincel@gmail.com',
                phoneNumber: '(41)6 6666-6666',
                whatsappNumber: '(41)6 6666-6666',
                registrationDate: new Date(),
                password: '123abc'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/pessoas')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterName, filterLastName e req.query.id', async() => {

        const resposta = await testServer
            .get(`/pessoas/?filterName=Gen&filterLastName=Hon&id=${pessoa}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterEmail', async() => {

        const resposta = await testServer
            .get('/pessoas/?filterEmail=fpincel')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterPhoneNumber', async() => {

        const resposta = await testServer
            .get('/pessoas/?filterPhoneNumber=8888')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com filterWhatsappNumber', async() => {

        const resposta = await testServer
            .get('/pessoas/?filterWhatsappNumber=6666')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com todos os filtros tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/pessoas/?filterName=Pa&filterLastName=Pa&filterEmail=gh&filterPhoneNumber=88&filterWhatsappNumber=77')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterName')
        expect(resposta.body).toHaveProperty('errors.query.filterLastName')
        expect(resposta.body).toHaveProperty('errors.query.filterEmail')
        expect(resposta.body).toHaveProperty('errors.query.filterPhoneNumber')
        expect(resposta.body).toHaveProperty('errors.query.filterWhatsappNumber')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/pessoas/?page=a')
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