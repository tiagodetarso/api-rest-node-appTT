import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Documento - GetAll', () =>{

    let tipoDocumento1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/tiposDocumento')
            .send({
                documentName: 'DocA'
            })
        
        tipoDocumento1 = respostaCreate1.body.content

        await testServer
            .post('/tiposDocumento')
            .send({
                documentName: 'DocB'
            })

        await testServer
            .post('/tiposDocumento')
            .send({
                documentName: 'DocC'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/tiposDocumento')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filter e req.query.id', async() => {

        const resposta = await testServer
            .get(`/tiposDocumento/?filter=DocB&id=${tipoDocumento1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filter tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/tiposDocumento/?filter=RG')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filter')
    })

    it('Pesquisa com req.query.filter', async() => {

        const resposta = await testServer
            .get('/tiposDocumento/?filter=docC')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/tiposDocumento/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/tiposDocumento/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})