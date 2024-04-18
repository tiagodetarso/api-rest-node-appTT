import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { EnderecosProvider } from '../../database/providers/enderecos'
import { validation } from '../../shared/middlewares'
import { IEndereco } from '../../database/models'

interface IBodyProps extends Omit<IEndereco, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idCity: yup.number().moreThan(0).required(),
        idLogradouro: yup.number().moreThan(0).required(),
        number: yup.number().moreThan(0).required(),
        neighborhood: yup.string().min(3).optional()
    }))
}))

export const create = async (req: Request<{},{},IEndereco>, res: Response) => {

    const result = await EnderecosProvider.create(req.body)
    if ( result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Endereco cadastrado!', content: result})
}