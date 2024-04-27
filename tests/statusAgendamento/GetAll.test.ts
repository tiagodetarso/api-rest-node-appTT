import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - GetAll', () =>{

    let statusAgendamento1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/statusagendamento')
            .send({
                status: 'Alteração de horário negada pelo cliente'
            })
        
        statusAgendamento1 = respostaCreate1.body.content

        await testServer
            .post('/statusagendamento')
            .send({
                status: 'Alteração de horário aceita pelo cliente'
            })

        await testServer
            .post('/statusagendamento')
            .send({
                status: 'Alteração de horário solicitada pelo cliente'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/statusagendamento')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filter e req.query.id', async() => {

        const resposta = await testServer
            .get(`/statusagendamento/?filter=aceita&id=${statusAgendamento1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filter tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/statusagendamento/?filter=ac')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filter')
    })

    it('Pesquisa com req.query.filter', async() => {

        const resposta = await testServer
            .get('/statusagendamento/?filter=aceita')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/statusagendamento/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/statusagendamento/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})