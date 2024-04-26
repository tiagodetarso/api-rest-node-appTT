import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../shared/middlewares'
import { IStatusPagamento } from '../../database/models'
import { StatusPagamentoProvider } from '../../database/providers/statusPagamentos'


interface IBodyProps extends Omit<IStatusPagamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        status: yup.string().min(3).max(75).required(),
    }))
}))

export const create = async (req: Request<{},{},IStatusPagamento>, res: Response) => {

    const result = await StatusPagamentoProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Status de pagamento cadastrado!', content: result})
}