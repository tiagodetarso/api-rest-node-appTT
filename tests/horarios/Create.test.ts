import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Profissionais - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Arapongas',
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
                name: 'das Esmeraldas',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                idCity: municipio,
                number: 368,
                neighborhood: 'Vila Galo'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Ernesto',
                lastName: 'Miranda',
                email: 'ftal@gmail.com',
                phoneNumber: '(41) 9 9999-0009',
                whatsappNumber: '(41) 9 9999-0010',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Psicólogo',
                subtitle: 'Comportamental'
            })
        
        tituloProfissional = res6.body.content

        //cria o profissional
        const res7 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                isActive: true
            })
        
        profissional = res7.body.content
    })

    it('Criar registro', async () => {

        const resposta = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: new Date(2024, 3, 22, 8, 0),
                isAvaiable: true
            })

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })

})