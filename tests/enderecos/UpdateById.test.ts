import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let tipoLogradouro: number | undefined = undefined
    let municipio: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined

    beforeAll(async () => {

        const respostaCreateTL = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Beco'
            })
        
        tipoLogradouro = respostaCreateTL.body.content

        const respostaCreateM = await testServer
            .post('/municipios')
            .send({
                name: 'Londrina',
                state: 'PR'
            })
        
        municipio = respostaCreateM.body.content

        const respostaCreateL = await testServer
            .post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'dos Pelados'
            })
        
        logradouro = respostaCreateL.body.content

        const respostaCreate = await testServer
            .post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 75,
                neighborhood: 'Vila Rex'
            })
        
        endereco = respostaCreate.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/enderecos/${endereco}`)
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Vila Fany'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/enderecos/${endereco}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idPublicPlace).toEqual(logradouro)
        expect(resVerificar.body.number).toEqual(100)
        expect(resVerificar.body.neighborhood).toEqual('Vila Fany')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/enderecos/999')
            .send({
                idPublicPlace: logradouro,
                number: 75,
                neighborhood: 'Vila Primavera'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com neighborhood Contendo menos de três caracteres e number = 0', async() => {

        const resposta = await testServer
            .put(`/enderecos/${endereco}`)
            .send({
                idPublicPlace: logradouro,
                number: 0,
                neighborhood: 'Vi',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.neighborhood')
        expect(resposta.body).toHaveProperty('errors.body.number')
    })

    it('Tenta atualizar registro com neighborhood contendo mais de 75 caracteres e number negativo', async() => {

        const resposta = await testServer
            .put(`/enderecos/${endereco}`)
            .send({
                idPublicPlace: logradouro,
                number: -100,
                neighborhood: 'Vila Nabucodonosor da Santa União do Triunvirato Divino Eterno da Graça do Pai',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.neighborhood')
        expect(resposta.body).toHaveProperty('errors.body.number')
    })

    it('Tenta atualizar registro com idPublicPlace inexistente', async() => {

        const resposta = await testServer
            .put(`/enderecos/${endereco}`)
            .send({
                idPublicPlace: 999,
                number: 100,
                neighborhood: 'Vila Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/enderecos/0')
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/enderecos/1.1')
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/enderecos/1,1')
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/enderecos/-1')
            .send({
                idPublicPlace: logradouro,
                number: 100,
                neighborhood: 'Pastor Nabucodonosor',
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})