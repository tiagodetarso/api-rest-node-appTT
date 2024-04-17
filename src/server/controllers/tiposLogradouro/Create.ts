import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { TiposLogradouroProvider } from '../../database/providers/tiposLogradouro'
import { validation } from '../../shared/middlewares'
import { ITipoLogradouro } from '../../database/models'


interface IBodyProps extends Omit<ITipoLogradouro, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        type: yup.string().min(3).required(),
    }))
}))

export const create = async(req: Request<{},{},ITipoLogradouro>, res: Response) => {

    const result = await TiposLogradouroProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Tipo de logradouro cadastrado', content: result})
}