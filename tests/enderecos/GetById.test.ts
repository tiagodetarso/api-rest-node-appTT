import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetById', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Estrada'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateM = await testServer
            .post('/municipios')
            .send({
                name: 'Pitangueias',
                state: 'PR'
            })
        
        municipio = respostaCreateM.body.content

        const respostaCreateL = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Dr. Pimpolho'
            })
        
        logradouro = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 300,
                neighborhood: 'Cj. Habitacional Cileide'
            })
        
        endereco = respostaCreate.body.content
    })

    it('Pesquisa registro por id', async() => {
        const resposta = await testServer
            .get(`/enderecos/${endereco}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('neighborhood')
        expect(resposta.body).toHaveProperty('idPublicPlace')
        expect(resposta.body).toHaveProperty('number')
    })

    it('Tenta pesquisar registro inexistente', async() => {
        const resposta = await testServer
            .get('/enderecos/999')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors')
    })

    it('Tenta pesquisar registro com id=0', async() => {
        const resposta = await testServer
            .get('/enderecos/0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo uma string', async() => {
        const resposta = await testServer
            .get('/enderecos/x')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com ponto', async() => {
        const resposta = await testServer
            .get('/enderecos/1.1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo não inteiro com vírgula', async() => {
        const resposta = await testServer
            .get('/enderecos/1,1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta pesquisar registro com id sendo negativo', async() => {
        const resposta = await testServer
            .get('/enderecos/-2')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})