import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ITituloProfissional } from '../../database/models'


interface IBodyProps extends Omit<ITituloProfissional, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().min(3).max(50).required(),
        subtitle: yup.string().min(3).max(75).optional()
    }))
}))

export const create = (req: Request<{},{},ITituloProfissional>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Título profissional cadastrado!')
}