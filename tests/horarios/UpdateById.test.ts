import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - UpdateById', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined
    let horario: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Pitanga',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Antiga Estrada'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'dos Matadores'
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 9000,
                neighborhood: 'Casca de Bala'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Jalin',
                lastName: 'Rabei',
                email: 'jrabei@gmail.com',
                phoneNumber: '(41)9 9999-1107',
                whatsappNumber: '(41)9 9999-1108',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Advogado',
                subtitle: 'Criminalista'
            })
        
        tituloProfissional = res6.body.content

        //cria o profissional
        const res7 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional = res7.body.content

        const res8 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 0).toString()),
                isAvaiable: true
            })
        
        horario = res8.body.content
    })

    it('Atualiza registro', async() => {

        const resposta = await testServer
            .put(`/horarios/${horario}`)
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 0).toString()),
                isAvaiable: false
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(resposta.body).toHaveProperty('msg')
        expect(typeof(resposta.body.msg)).toEqual('string')

        const resVerificar = await testServer
            .get(`/horarios/${horario}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.idProfessional).toEqual(pessoa)
        expect(resVerificar.body.schedulingTime).toEqual(Date.parse(new Date(2024, 5, 11, 9, 0).toString()))
        expect(Boolean(resVerificar.body.isAvaiable)).toEqual(false)
    })

    it('Tenta atualizar registro que não existe', async() => {

        const resposta = await testServer
            .put('/horarios/999')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com schedulingTime do tipo string', async() => {

        const resposta = await testServer
            .put(`/horarios/${horario}`)
            .send({
                idProfessional: profissional,
                schedulingTime: new Date(2024, 5, 11, 9, 30).toString(),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.body.schedulingTime')
    })

    it('Tenta atualizar registro com idProfessional inexistente', async() => {

        const resposta = await testServer
            .put(`/horarios/${horario}`)
            .send({
                idProfessional: 999,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(resposta.body).toHaveProperty('errors.default')
    })
    
    it('Tenta atualizar registro com id igual a zero', async() => {

        const resposta = await testServer
            .put('/horarios/0')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async() => {

        const resposta = await testServer
            .put('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

    it('Tenta atualizar registro com id não inteiro com ponto', async() => {

        const resposta = await testServer
            .put('/horarios/1.1')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id não inteiro com vírgula', async() => {

        const resposta = await testServer
            .put('/horarios/1,1')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro com id negativo', async() => {

        const resposta = await testServer
            .put('/horarios/-1')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 30).toString()),
                isAvaiable: true
            })
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})