import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Serviços - Create', () => {

    it('Criar registro', async () => {

        const resposta = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Corte de cabelo, de acordo com a preferência do cliente, ' 
                    +'utiliando tecnicas especializadas, instrumentos de qualidade e produtos adequados. '
                    +'Inclui lavagem.'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})