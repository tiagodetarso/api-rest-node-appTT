import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { LogradourosProvider } from '../../database/providers/logradouros'
import { validation } from '../../shared/middlewares'
import { ILogradouro } from '../../database/models'

interface IBodyProps extends Omit<ILogradouro, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idCity: yup.number().moreThan(0).integer().required(),
        idPlaceType: yup.number().moreThan(0).integer().required(),
        name: yup.string().min(3).max(75).required()
    }))
}))

export const create = async (req: Request<{},{},ILogradouro>, res: Response) => {

    const result = await LogradourosProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    

    return res.status(StatusCodes.CREATED).json({msg: 'Logradouro cadastrado!', content: result})
}