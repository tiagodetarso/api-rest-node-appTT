import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Serviços Prestados - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let servico: number | undefined = undefined
    let profissional: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Astorga',
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
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'José Mendes Rodrigues',
                number: 45,
                neighborhood: 'Jardim Lice I'
            })
        
        logradouro = res3.body.content

        //cria pessoa do profissional
        const res4 = await testServer.post('/cadastrar')
            .send({
                idPublicPlace: logradouro,
                name: 'Tiago de Tarso',
                lastName: 'Raggiotto Gonçalves',
                email: 'ttrgoncalves@gmail.com',
                phoneNumber: '(41) 9 9909-8911',
                whatsappNumber: '(41) 9 9909-8911',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa = res4.body.content

        //cria o título profissional
        const res5 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Cabeleireiro',
                subtitle: 'Especializado em corte masculino'
            })
        
        tituloProfissional = res5.body.content

        //cria o profissional
        const res6 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                isActive: true
            })

        profissional = res6.body.content

        //cria serviço
        const res7 = await testServer.post('/servicos')
            .send({
                name: 'Corte de Cabelo',
                genericDescription: 'Corte de cabelo, de acordo com a preferência do cliente, ' 
                    +'utiliando tecnicas especializadas, instrumentos de qualidade e produtos adequados. '
                    +'Inclui lavagem.'
            })
        
        servico = res7.body.content
    })

    it('Criar registro', async () => {

        //cria o serviço prestado
        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço prestado por este profissional',
                price: 30,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})