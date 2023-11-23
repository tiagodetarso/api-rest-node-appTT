import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IServico } from '../../database/models'


interface IBodyProps extends Omit<IServico, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().min(3).required(),
        genericDescription: yup.string().min(5).max(150).required()
    }))
}))

export const create = (req: Request<{},{},IServico>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Serviço cadastrado!')
}