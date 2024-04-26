import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Tipos de Documento - UpdateById', () =>{

    let tipoDocumento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/tiposDocumento')
            .send({
                documentName: 'CPF'
            })
        
        tipoDocumento= respostaCreate.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/tiposDocumento/${tipoDocumento}`)
            .send({documentName: 'Identidade(RG)'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/tiposDocumento/${tipoDocumento}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.documentName).toEqual('Identidade(RG)')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/tiposDocumento/999')
            .send({documentName: 'CNPJ'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com documentName contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/tiposDocumento/${tipoDocumento}`)
            .send({documentName: 'RG'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.documentName')
    })

    it('Tenta atualizar registro com documentName contendo mais de 50 caracteres', async() => {

        const resposta = await testServer
            .put(`/tiposDocumento/${tipoDocumento}`)
            .send({documentName: 'Número de Registro no Conselho de Classe Específigo Regional'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.documentName')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/tiposDocumento/0')
            .send({documentName: 'CNPJ'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/tiposDocumento')
            .send({documentName: 'CNPJ'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/tiposDocumento/1.1')
            .send({documentName: 'CNPJ'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/tiposDocumento/1,1')
            .send({documentName: 'CNPJ'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})