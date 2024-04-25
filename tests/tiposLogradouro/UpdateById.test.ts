import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Logradouro - UpdateById', () =>{

    let tipoLogradouro: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/tiposlogradouro')
            .send({
                type: 'Porto'
            })
        
        tipoLogradouro= respostaCreate.body.content
        console.log(respostaCreate.body)
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/tiposlogradouro/${tipoLogradouro}`)
            .send({type: 'Saída'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/tiposlogradouro/${tipoLogradouro}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.type).toEqual('Saída')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/tiposlogradouro/999')
            .send({type: 'Estrada'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com type contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/tiposlogradouro/${tipoLogradouro}`)
            .send({type: 'Pr'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.type')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/tiposlogradouro/0')
            .send({type: 'Estrada'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/tiposlogradouro')
            .send({type: 'Estrada'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/tiposlogradouro/1.1')
            .send({type: 'Estrada'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/tiposlogradouro/1,1')
            .send({type: 'Estrada'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})