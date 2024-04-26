import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Pagamento - UpdateById', () =>{

    let statusPagamento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/statuspagamento')
            .send({
                status: 'Cliente indica o pagamento'
            })
        
        statusPagamento= respostaCreate.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/statuspagamento/${statusPagamento}`)
            .send({status: 'Pago (profissional confirma o pagamento)'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/statuspagamento/${statusPagamento}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.status).toEqual('Pago (profissional confirma o pagamento)')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/statuspagamento/999')
            .send({status: 'Profissional indica a falta de pagamento'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com status contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/statuspagamento/${statusPagamento}`)
            .send({status: 'Pr'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta atualizar registro com status contendo mais de 75 caracteres', async() => {

        const resposta = await testServer
            .put(`/statuspagamento/${statusPagamento}`)
            .send({status: 'Profissional indica a falta de pagamento e manifesta a possibilidade de colocar o nome do cliente no serasa'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/statuspagamento/0')
            .send({status: 'Profissional indica a falta de pagamento'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/statuspagamento')
            .send({status: 'Profissional indica a falta de pagamento'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/statuspagamento/1.1')
            .send({status: 'Profissional indica a falta de pagamento'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/statuspagamento/1,1')
            .send({status: 'Profissional indica a falta de pagamento'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})