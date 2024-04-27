import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Municípios - GetAll', () =>{

    let municipio1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/municipios')
            .send({
                name: 'Londrina',
                state: 'PR'
            })
        
        municipio1 = respostaCreate1.body.content

        await testServer
            .post('/municipios')
            .send({
                name: 'Maringá',
                state: 'PR'
            })

        await testServer
            .post('/municipios')
            .send({
                name: 'Paranavaí',
                state: 'PR'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/municipios')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterName, req.query.filterState e req.query.id', async() => {

        const resposta = await testServer
            .get(`/municipios/?filterName=Maringá&filterSubtitle=PR&id=${municipio1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filterName tendo menos de 3 caracteres e req.query.filterState tendo menos de 2 caracteres', async() => {

        const resposta = await testServer
            .get('/municipios/?filterName=Pa&filterState=P')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterName')
        expect(resposta.body).toHaveProperty('errors.query.filterState')
    })

    it('Pesquisa com req.query.filterName', async() => {

        const resposta = await testServer
            .get('/municipios/?filterName=Paranavaí')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterState', async() => {

        const resposta = await testServer
            .get('/municipios/?filterState=PR')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterState, sendo que o filterState pesquisado não contém nenhum item cadastrado', async() => {

        const resposta = await testServer
            .get('/municipios/?filterState=SP')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toEqual(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/municipios/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/municipios/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})