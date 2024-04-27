import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Status de Agendamento - UpdateById', () =>{

    let statusAgendamento: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/statusagendamento')
            .send({
                status: 'Agendamento cancelado pelo cliente',
            })
        
        statusAgendamento= respostaCreate.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/statusagendamento/${statusAgendamento}`)
            .send({status: 'Alteração de horário solicitada pelo profissional'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/statusagendamento/${statusAgendamento}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.status).toEqual('Alteração de horário solicitada pelo profissional')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/statusagendamento/999')
            .send({status: 'Alteração de horário negada pelo cliente'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com status contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/statusagendamento/${statusAgendamento}`)
            .send({status: 'Al'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta atualizar registro com status contendo mais de 75 caracteres', async() => {

        const resposta = await testServer
            .put(`/statusagendamento/${statusAgendamento}`)
            .send({status: 'Profissional indica a falta de pagamento e manifesta a possibilidade de colocar o nome do cliente no serasa'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.status')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/statusagendamento/0')
            .send({status: 'Alteração de horário negada pelo cliente'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/statusagendamento')
            .send({status: 'Alteração de horário negada pelo cliente'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/statusagendamento/1.1')
            .send({status: 'Alteração de horário negada pelo cliente'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/statusagendamento/1,1')
            .send({status: 'Alteração de horário negada pelo cliente'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})