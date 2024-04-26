import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - GetAll', () =>{

    let statusPagamento1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/statuspagamento')
            .send({
                status: 'Profissional indica a falta de pagamento'
            })
        
        statusPagamento1 = respostaCreate1.body.content

        await testServer
            .post('/statuspagamento')
            .send({
                status: 'Pago pelo aplicativo'
            })

        await testServer
            .post('/statuspagamento')
            .send({
                status: 'Pagou valor inferior ao valor do serviço'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/statuspagamento')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filter e req.query.id', async() => {

        const resposta = await testServer
            .get(`/statuspagamento/?filter=aplicativo&id=${statusPagamento1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filter tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/statuspagamento/?filter=pa')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filter')
    })

    it('Pesquisa com req.query.filter', async() => {

        const resposta = await testServer
            .get('/statuspagamento/?filter=inferior')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/statuspagamento/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/statuspagamento/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})