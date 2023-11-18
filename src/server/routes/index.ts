import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ClientesController } from './../controllers'

const router = Router()

//Rota pública raiz
router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('REST API appTT')
}) 


//CLIENTES (públicas)
router.post('/clientes', ClientesController.createValidation, ClientesController.create,)

//CLIENTES (privadas)

//PROFISSIONAIS (públicas)

//PROFISSIONAIS (privadas)









export { router }