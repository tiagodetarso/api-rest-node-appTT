import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Logradouros - GetById', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposLogradouro')
            .send({
                type: 'Estrada'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateL = await testServer
            .post('/municipios')
            .send({
                name: 'Pitangueias',
                state: 'PR'
            })
        
        municipio = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Dr. Pimpolho',
            })
        
        logradouro = respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/logradouros/${logradouro}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('name')
        expect(resposta.body).toHaveProperty('idCity')
        expect(resposta.body).toHaveProperty('idPlaceType')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/logradouros/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/logradouros/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/logradouros/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/logradouros/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/logradouros/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})