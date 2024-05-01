import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateM = await testServer
            .post('/municipios')
            .send({
                name: 'Curitiba',
                state: 'PR'
            })
        
        municipio = respostaCreateM.body.content

        const respostaCreateL = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Bruno Filgueira'
            })
        
        logradouro = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 2000,
                neighborhood: 'Bigorrilho'
            })
        
        endereco = respostaCreate.body.content
    
        await testServer
            .post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 2001,
                neighborhood: 'Champagnat'
            })
        
        await testServer
            .post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 150,
                neighborhood: 'Batel'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/enderecos')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterNeighborhood, filterNumber e req.query.id', async() => {

        const resposta = await testServer
            .get(`/enderecos/?filterNumber=150&filterNeighborhood=Batel&id=${endereco}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filterNeighborhood tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/enderecos/?filterNeighborhood=Pa')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterNeighborhood')
    })

    it('Tenta pesquisar com req.query.filterNumber=0', async() => {

        const resposta = await testServer
            .get('/enderecos/?filterNumber=0')
            .send()
        
        console.log(resposta.body)
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveLength(0)
        expect(Number(resposta.header['x-total-count'])).toEqual(0)
    })

    it('Pesquisa com req.query.filterNeighborhood e req.query.filterNumber', async() => {

        const resposta = await testServer
            .get('/enderecos/?filterNeighborhood=Champagnat&filterNumber=2001')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterNeighborhood', async() => {

        const resposta = await testServer
            .get('/enderecos/?filterNeighborhood=Big')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterNumber', async() => {

        const resposta = await testServer
            .get('/enderecos/?filterNumber=2001')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/enderecos/?page=a')
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