import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Enderecos - GetAll', () =>{

    let municipio: number | undefined = undefined
    let tipoLogradouro: number | undefined = undefined
    let logradouro: number | undefined = undefined
    let endereco: number | undefined = undefined
    let pessoa: number | undefined = undefined
    let pessoa2: number | undefined = undefined
    let tituloProfissional: number | undefined = undefined
    let profissional: number | undefined = undefined
    let profissional2: number | undefined = undefined
    let horario: number | undefined = undefined

    beforeAll( async() => {
        //cria municipio
        const res1 = await testServer.post('/municipios')
            .send({
                name: 'Ivaiporã',
                state: 'PR'
            })

        municipio = res1.body.content

        //cria tipo de logradouro
        const res2 = await testServer.post('/tiposlogradouro')
            .send({
                type: 'Atalho'
            })
        
        tipoLogradouro = res2.body.content

        //cria logradouro
        const res3 = await testServer.post('/logradouros')
            .send({
                idCity: municipio,
                idPlaceType: tipoLogradouro,
                name: 'Caminho do Mato'
            })
        
        logradouro = res3.body.content

        const res4 = await testServer.post('/enderecos')
            .send({
                idPublicPlace: logradouro,
                number: 137,
                neighborhood: 'Jardim Rural'
            })
        
        endereco = res4.body.content

        //cria pessoa do profissional
        const res5 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Mia',
                lastName: 'Regazza',
                email: 'mregazza@gmail.com',
                phoneNumber: '(41)9 9999-1109',
                whatsappNumber: '(41)9 9999-1110',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa = res5.body.content

        const res9 = await testServer.post('/cadastrar')
            .send({
                idAdress: endereco,
                name: 'Paula',
                lastName: 'Tejano',
                email: 'ptejano@gmail.com',
                phoneNumber: '(41)9 9999-1111',
                whatsappNumber: '(41)9 9999-1112',
                registrationDate: Date.parse(new Date().toString()),
                password: '123abc',
            })
        
        pessoa2 = res9.body.content

        //cria o título profissional
        const res6 = await testServer.post('/titulosprofissionais')
            .send({
                title: 'Massoterapeuta',
                subtitle: 'Tradicional'
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

        const res10 = await testServer.post('/profissionais')
            .send({
                idPessoa: pessoa2,
                idProfessionalTitle: tituloProfissional,
                serviceAddress: endereco,
                isActive: true
            })
        
        profissional2 = res10.body.content

        const res8 = await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 9, 0).toString()),
                isAvaiable: true
            })
        
        horario = res8.body.content

        await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 10, 0).toString()),
                isAvaiable: true
            })
        
        await testServer.post('/horarios')
            .send({
                idProfessional: profissional,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 11, 0).toString()),
                isAvaiable: true
            })

        await testServer.post('/horarios')
            .send({
                idProfessional: profissional2,
                schedulingTime: Date.parse(new Date(2024, 5, 11, 11, 0).toString()),
                isAvaiable: true
            })
    })

    it('Pesquisa todos os registros', async() => {

        const resposta = await testServer
            .get('/horarios')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(Number(resposta.header['x-total-count'])).toEqual(4)
    })

    it('Pesquisa com filterSchedulingTime e req.query.id', async() => {

        const resposta = await testServer
            .get(`/horarios/?filterSchedulingTime=${Date.parse(new Date(2024, 5, 11, 10, 5).toString())}&id=${horario}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(3)
        expect(Number(resposta.header['x-total-count'])).toBeGreaterThan(1)
    })

    it('Pesquisa com filterIdProfissional', async() => {
        
        const resposta = await testServer
            .get(`/horarios/?filterIdProfessional=${profissional2}`)
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.OK)
        expect(typeof(resposta.body)).toEqual('object')
        expect(resposta.body).toHaveLength(1)
        expect(Number(resposta.header['x-total-count'])).toEqual(1)
    })
    
    it('Pesquisa com todos os filtros sendo zero', async() => {
        
        const resposta = await testServer
            .get('/horarios/?filterSchedulingTime=0&filterIdProfessional=0')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterSchedulingTime')
    })

    it('Pesquisa com todos os filtros sendo negativos', async() => {
        
        const resposta = await testServer
            .get('/horarios/?filterSchedulingTime=-1&filterIdProfessional=-1')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterSchedulingTime')
    })

    it('Pesquisa com todos os filtros sendo strings', async() => {
        
        const resposta = await testServer
            .get('/horarios/?filterSchedulingTime=0&filterIdProfessional=0&filterIsAvaiable=c')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.filterIdProfessional')
        expect(resposta.body).toHaveProperty('errors.query.filterSchedulingTime')
        expect(resposta.body).toHaveProperty('errors.query.filterIsAvaiable')
    })

    it('Tenta pesquisar com req.query.page sendo uma string', async() => {

        const resposta = await testServer
            .get('/horarios/?page=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.page')
    })

    it('Tenta pesquisar com req.query.limit sendo uma string', async() => {

        const resposta = await testServer
            .get('/enderecos/?limit=a')
            .send()
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.query.limit')
    })
})