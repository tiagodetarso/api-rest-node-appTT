import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let cliente: number | undefined = undefined
    let data1: Date | undefined = undefined
    let data2: string | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Colombo',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Estrada'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'da Uva',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 15,
                neighborhood: 'Jardim das Videiras'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Uvinaldo',
                lastName: 'Vinhudo',
                email: 'uvinhudo@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa = res5.body.content

        const res6 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Larissa',
                lastName: 'Emauele',
                email: 'lemanuele@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa2 = res6.body.content

        const res7 = await testServer.post('/clientes')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        cliente = res7.body.content
    })

    it('Atualiza registro', async() => {

        data1 = new Date()
        data2 = data1.toString()
        const resposta = await testServer
            .put(`/clientes/${cliente}`)
            .send({
                idPessoa: pessoa2,
                genderId: 'Mulher Heterossexual',
                dateOfBirth: Date.parse(data2)
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')

        const resVerificar = await testServer
            .get(`/clientes/${cliente}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idPessoa).toEqual(pessoa2)
        expect(resVerificar.body.genderId).toEqual('Mulher Heterossexual')
        expect(resVerificar.body.dateOfBirth).toEqual(Date.parse(data2))
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/clientes/999')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com dateOfBirth do tipo string', async() => {

        const resposta = await testServer
            .put(`/clientes/${cliente}`)
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: new Date(1989, 4, 11).toString()
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.dateOfBirth')
    })

    it('Tenta atualizar registro com idPessoa inexistente', async() => {

        const resposta = await testServer
            .put(`/clientes/${cliente}`)
            .send({
                idPessoa: 999,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/clientes/0')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/clientes')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/clientes/1.1')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/clientes/1,1')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/clientes/-1')
            .send({
                idPessoa: pessoa,
                genderId: 'Homem Heterossexual',
                dateOfBirth: Date.parse(new Date(1989, 4, 11).toString())
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})