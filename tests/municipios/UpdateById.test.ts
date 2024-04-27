import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Municipios - UpdateById', () =>{

    let municipio: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/municipios')
            .send({
                name: 'Arapongas',
                state: 'PR'
            })
        
        municipio= respostaCreate.body.content
        console.log(respostaCreate.body)
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/municipios/${municipio}`)
            .send({
                name: 'Apucarana',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/municipios/${municipio}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.name).toEqual('Apucarana')
        expect(resVerificar.body.state).toEqual('PR')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/municipios/999')
            .send({
                name: 'Califórnia',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com name Contendo menos de três caracteres e state contendo menos de 2 caracteres', async() => {

        const resposta = await testServer
            .put(`/municipios/${municipio}`)
            .send({
                name: 'Ca',
                state: 'P'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.state')
    })

    it('Tenta atualizar registro com name contendo mais de 75 caracteres e state contendo mais de 2 caracteres', async() => {

        const resposta = await testServer
            .put(`/municipios/${municipio}`)
            .send({
                name: 'Cidade de Califórnia do Estado Brasileiro da América do Hemisfério Sul do Planeta Terra',
                state: 'Paraná'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.state')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/municipios/0')
            .send({
                name: 'Califórnia',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/municipios')
            .send({
                name: 'Califórnia',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/municipios/1.1')
            .send({
                name: 'Califórnia',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/municipios/1,1')
            .send({
                name: 'Califórnia',
                state: 'PR'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})