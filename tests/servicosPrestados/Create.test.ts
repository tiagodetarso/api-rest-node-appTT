import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'



describe('Serviços Prestados - Create', () => {

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let servico: number | undefined = undefined
    let profissional: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Pitangueiras',
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
                name: 'Ermelinda da Silveira',
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                idCity: municipio,
                number: 115,
                neighborhood: 'Vila Nova'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Acelino',
                lastName: 'Popó',
                email: 'apopo@gmail.com',
                phoneNumber: '(41) 9 9999-0007',
                whatsappNumber: '(41) 9 9999-0008',
                registrationDate: new Date(),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Dentista',
                subtitle: 'Ortondentista'
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
        
        //cria serviço
        const res8 = await testServer.post('/servicos')
            .send({
                name: 'Consulta de manutenção',
                genericDescription: 'Consulta para verificação das condições do aparelho e avaliação da evolução do tratamento'
            })
        
        servico = res8.body.content
    })

    it('Criar registro', async () => {

        //cria o serviço prestado
        const resposta = await testServer.post('/servicosprestados')
            .send({
                idServico: servico,
                idProfessional: profissional,
                specificDescription: 'Alguma particularidade do serviço deste profissional',
                price: 250,
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta.body.msg).toEqual('string')
        expect(typeof resposta.body.content).toEqual('number')
    })
    
})