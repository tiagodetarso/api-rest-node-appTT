import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { ServicosProvider } from '../../database/providers/servicos'
import { validation } from '../../shared/middlewares'
import { IServico } from '../../database/models'


interface IBodyProps extends Omit<IServico, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().min(3).max(75).required(),
        genericDescription: yup.string().min(5).max(200).required()
    }))
}))

export const create = async (req: Request<{},{},IServico>, res: Response) => {

    const result = await ServicosProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Serviço cadastrado!', content: result})
}