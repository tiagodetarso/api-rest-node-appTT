import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Serviços - GetAll', () =>{

    let servico1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/servicos')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        servico1 = respostaCreate1.body.content

        await testServer
            .post('/servicos')
            .send({
                name: 'Dia de Spa',
                genericDescription: 'Das 09:30 às 17:00, incluindo tratamento para cabelos, mãos, pés, massagens, banho relaxante, café da manhã, almoço e café da tarde'
            })

        await testServer
            .post('/servicos')
            .send({
                name: 'Bronzeamento Artificial',
                genericDescription: 'Sessão de bronzeamento de 30 min. em equipamento de última geração'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/servicos')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterName e req.query.id', async() => {

        const resposta = await testServer
            .get(`/servicos/?filterName=${'Dia de Spa'}&id=${servico1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filterName tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/servicos/?filterName=Di')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterName')
    })

    it('Pesquisa com req.query.filterName', async() => {

        const resposta = await testServer
            .get(`/servicos/?filterName=${'Bronzeamento Artificial'}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/servicos/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/servicos/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})