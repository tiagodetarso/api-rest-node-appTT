import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IStatusPagamento } from '../../database/models'


interface IBodyProps extends Omit<IStatusPagamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        status: yup.string().min(3).required(),
    }))
}))

export const create = (req: Request<{},{},IStatusPagamento>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Status de pagamento cadastrado!', content: createdID})
}