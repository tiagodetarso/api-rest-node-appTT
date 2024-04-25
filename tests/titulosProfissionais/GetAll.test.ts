import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Titulos Profissionais - GetAll', () =>{

    let tituloProfissional1: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate1 = await testServer
            .post('/titulosprofissionais')
            .send({
                title: 'Dentista',
                subtitle: 'Odontopediatra'
            })
        
        tituloProfissional1 = respostaCreate1.body.content

        await testServer
            .post('/titulosprofissionais')
            .send({
                title: 'Dentista',
                subtitle: 'Implantodentista'
            })

        await testServer
            .post('/titulosprofissionais')
            .send({
                title: 'Dentista',
                subtitle: 'Estomatologista'
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterTitle, req.query.filterSubtitle e req.query.id', async() => {

        const resposta = await testServer
            .get(`/titulosprofissionais/?filterTitle=Dentista&filterSubtitle=Estomatologista&id=${tituloProfissional1}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(2)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.filterTitle, req.query.filterSubtitle tendo menos de 3 caracteres', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais/?filterTitle=de&filterSubtitle=od')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterTitle')
        expect(resposta.body).toHaveProperty('errors.query.filterSubtitle')
    })

    it('Pesquisa com req.query.filterTitle', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais/?filterTitle=Dentista')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Pesquisa com req.query.filterSubtitle', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais/?filterSubtitleitle=Implantodentista')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(0)
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/titulosprofissionais/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })

    
})