import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ITipoLogradouro } from '../../database/models'


interface IBodyProps extends Omit<ITipoLogradouro, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        type: yup.string().min(3).required(),
    }))
}))

export const create = (req: Request<{},{},ITipoLogradouro>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Tipo de logradouro cadastrado!', content: createdID})
}