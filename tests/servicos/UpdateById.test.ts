import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Servicos - UpdateById', () =>{

    let servico: number | undefined = undefined

    beforeAll(async() => {
        const respostaCreate = await testServer
            .post('/servicos')
            .send({
                name: 'Pés',
                genericDescription: 'Cuidados completos para as unhas dos pés'
            })
        
        servico= respostaCreate.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/servicos/${servico}`)
            .send({
                name: 'Design de Sombrancelha',
                genericDescription: 'Design e estilização das sombrancelhas de acordo com formato do rosto e preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/servicos/${servico}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.name).toEqual('Design de Sombrancelha')
        expect(resVerificar.body.genericDescription).toEqual('Design e estilização das sombrancelhas de acordo com formato do rosto e preferência da(o) cliente')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/servicos/999')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com name e genericDescription contendo menos de três caracteres', async() => {

        const resposta = await testServer
            .put(`/servicos/${servico}`)
            .send({
                name: 'De',
                genericDescription: 'De'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.genericDescription')
    })

    it('Tenta atualizar registro com name contendo mais de 75 caracteres e genericDescription contendo mais de 2 caracteres', async() => {

        const resposta = await testServer
            .put(`/servicos/${servico}`)
            .send({
                name: 'Design de unhas design de unhas design de unhas design de unhas design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente Design e estilização das unhas das mãos de acordo com preferência da(o) cliente Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.genericDescription')
    })

    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/servicos/0')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/servicos')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/servicos/1.1')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/servicos/1,1')
            .send({
                name: 'Design de unhas',
                genericDescription: 'Design e estilização das unhas das mãos de acordo com preferência da(o) cliente'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})