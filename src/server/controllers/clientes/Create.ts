import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { ClientesProvider } from '../../database/providers/clientes'
import { validation } from '../../shared/middlewares'
import { ICliente } from '../../database/models'

interface IBodyProps extends Omit<ICliente, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPessoa: yup.number().moreThan(0).required(),
        genderId: yup.string().optional(),
        dateOfBirth: yup.date().required(),
    }))
}))

export const create = async (req: Request<{},{},ICliente>, res: Response) => {

    const result = await ClientesProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Cliente cadastrado!', content: result})
}