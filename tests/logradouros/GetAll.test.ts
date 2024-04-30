import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Logradouros - GetAll', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreateTL = await testServer
            .post('/tiposLogradouro')
            .send({
                type: 'Rodovia'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateL = await testServer
            .post('/municipios')
            .send({
                name: 'Cascavel',
                state: 'PR'
            })
        
        municipio = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'BR-277',
            })
        
        logradouro = respostaCreate.body.content

        await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'PR-999',
            })

        await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'PR-888',
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/logradouros')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterName, filterIdCity e req.query.id', async() => {

        const resposta = await testServer
            .get(`/logradouros/?filterName=PR-888&filteridCity=${municipio}&id=${logradouro}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filterName tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/logradouros/?filterName=Pa')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterName')
    })

    it('Tenta pesquisar com req.query.filterIdCity inexistente', async() => {

        const resposta = await testServer
            .get('/logradouros/?filterIdCity=999')
            .send()
        
        console.log(resposta.body)
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveLength(0)
        expect(Number(resposta.header['x-total-count'])).toEqual(0)
    })

    it('Pesquisa com req.query.filterName e req.query.filterIdCity', async() => {

        const resposta = await testServer
            .get(`/logradouros/?filterName=PR-999&filterIdCity=${municipio}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterName', async() => {

        const resposta = await testServer
            .get('/logradouros/?filterName=PR-')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterIdCity', async() => {

        const resposta = await testServer
            .get(`/logradouros/?filterIdCity=${municipio}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/logradouros/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/logradouros/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})