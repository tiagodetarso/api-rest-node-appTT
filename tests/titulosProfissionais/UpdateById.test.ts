import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Titulos Profissionais - UpdateById', () =>{

    let tituloProfissional: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/titulosprofissionais')
            .send({
                title: 'Médico',
                subtitle: 'Clinico Geral'
            })
        
        tituloProfissional= respostaCreate.body.content
        console.log(respostaCreate.body)
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/titulosprofissionais/${tituloProfissional}`)
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/titulosprofissionais/${tituloProfissional}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.title).toEqual('Médico Clinico Geral')
        expect(resVerificar.body.subtitle).toEqual('Plantonista')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/titulosprofissionais/999')
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com title e subtitle contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/titulosprofissionais/${tituloProfissional}`)
            .send({
                title: 'Mé',
                subtitle: 'Ci'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.title')
        expect(resposta.body).toHaveProperty('errors.body.subtitle')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/titulosprofissionais/0')
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/titulosprofissionais')
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/titulosprofissionais/1.1')
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/titulosprofissionais/1,1')
            .send({
                title: 'Médico Clinico Geral',
                subtitle: 'Plantonista'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})