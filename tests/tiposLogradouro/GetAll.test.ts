import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Logradouro - GetAll', () =>{

    let tipoLogradouro1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Travessa'
            })
        
        tipoLogradouro1 = respostaCreate1.body.content

        await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Alameda'
            })

        await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Beco'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/tiposlogradouro')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filter e req.query.id', async() => {

        const resposta = await testServer
            .get(`/tiposlogradouro/?filter=Alameda&id=${tipoLogradouro1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filter tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/tiposlogradouro/?filter=al')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filter')
    })

    it('Pesquisa com req.query.filter', async() => {

        const resposta = await testServer
            .get('/tiposlogradouro/?filter=beco')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/tiposlogradouro/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/tiposlogradouro/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })

    
})