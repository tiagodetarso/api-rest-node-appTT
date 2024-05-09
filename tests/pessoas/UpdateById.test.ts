import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let data: Date | undefined = undefined
    let dataString: string | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Cambé',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Rua'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idPlaceType: tipoLogradouro,
                idCity: municipio,
                name: 'do Café',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 236,
                neighborhood: 'Vila Chaves'
            })
        
        endereco = res4.body.content

        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })

        pessoa = res5.body.content
    })

    it('Atualiza registro', async() => {

        data = new Date()
        dataString = data.toString()
        const resposta = await testServer
            .put(`/pessoas/${pessoa}`)
            .send({
                idAdress: endereco,
                name: 'Homero',
                lastName: 'Simpsom',
                email: 'hsimpsom@gmail.com',
                phoneNumber: '(44)9 8888-8888',
                whatsappNumber: '(44)9 8888-8888',
                registrationDate: Date.parse(dataString),
                password: 'abc123'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')


        const resVerificar = await testServer
            .get(`/pessoas/${pessoa}`)
            .send()
        
        console.log(resVerificar.body.registrationDate)
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idAdress).toEqual(endereco)
        expect(resVerificar.body.name).toEqual('Homero')
        expect(resVerificar.body.lastName).toEqual('Simpsom')
        expect(resVerificar.body.email).toEqual('hsimpsom@gmail.com')
        expect(resVerificar.body.phoneNumber).toEqual('(44)9 8888-8888')
        expect(resVerificar.body.whatsappNumber).toEqual('(44)9 8888-8888')
        expect(resVerificar.body.registrationDate).toEqual(Date.parse(dataString))
        expect(resVerificar.body.password).toEqual('abc123')
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/pessoas/999')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com name e last name com menos de três caracteres; email com menos de 8 caracteres; phoneNumber e whatsappNumber com menos de 10 caracteres e password com menos de 4 caracteres', async() => {

        const resposta = await testServer
            .put(`/pessoas/${pessoa}`)
            .send({
                idAdress: endereco,
                name: 'Br',
                lastName: 'P',
                email: 'b@ml.co',
                phoneNumber: '999999999',
                whatsappNumber: '999999999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.lastName')
        expect(resposta.body).toHaveProperty('errors.body.email')
        expect(resposta.body).toHaveProperty('errors.body.phoneNumber')
        expect(resposta.body).toHaveProperty('errors.body.whatsappNumber')
        expect(resposta.body).toHaveProperty('errors.body.password')
    })

    it('Tenta atualizar registro com name e lastName contendo mais de 80 caracteres; phoneNumber e whatsappNumber com mais de 16 caracteres e password com mais de 20 caracteres; email em formato diferente do formato de e-mail', async() => {

        const resposta = await testServer
            .put(`/pessoas/${pessoa}`)
            .send({
                idAdress: endereco,
                name: 'Bráulio Também Conhecido Jocosamento de Pinto Bilau Piroca Caralho Jeba Trolha Cabeçudo',
                lastName: 'Pinguela da Silva Souza Carvalho de Lima Soares Pinheiro Machado dos Prazeres Durão Júnior',
                email: 'brguelagmail.com',
                phoneNumber: '(41)999 9999-9999',
                whatsappNumber: '(41)999 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc456def789ghijkl'})
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.name')
        expect(resposta.body).toHaveProperty('errors.body.lastName')
        expect(resposta.body).toHaveProperty('errors.body.email')
        expect(resposta.body).toHaveProperty('errors.body.phoneNumber')
        expect(resposta.body).toHaveProperty('errors.body.whatsappNumber')
        expect(resposta.body).toHaveProperty('errors.body.password')
    })

    it('Tenta atualizar registro com resgistrationDate do tipo string', async() => {

        const resposta = await testServer
            .put(`/pessoas/${pessoa}`)
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: new Date().toString(),
                password: '123abc'
            })
        
        console.log(resposta.body)
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.registrationDate')
    })

    it('Tenta atualizar registro com idAdress inexistente', async() => {

        const resposta = await testServer
            .put(`/pessoas/${pessoa}`)
            .send({
                idAdress: 999,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/pessoas/0')
            .send({
                idAdress: 0,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/pessoas')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/pessoas/1.1')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/pessoas/1,1')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/pessoas/-1')
            .send({
                idAdress: endereco,
                name: 'Bráulio',
                lastName: 'Pinguela',
                email: 'brguela@gmail.com',
                phoneNumber: '(41)9 9999-9999',
                whatsappNumber: '(41)9 9999-9999',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc'
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})