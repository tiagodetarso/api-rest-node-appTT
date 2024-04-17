import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { TitulosProfissionaisProvider } from '../../database/providers/titulosProfissionais'
import { validation } from '../../shared/middlewares'
import { ITituloProfissional } from '../../database/models'


interface IBodyProps extends Omit<ITituloProfissional, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().min(3).max(50).required(),
        subtitle: yup.string().min(3).max(75).optional()
    }))
}))

export const create = async (req: Request<{},{},ITituloProfissional>, res: Response) => {

    const result = await TitulosProfissionaisProvider.create(req.body)
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                defatult: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg:'Título profissional cadastrado!', content: result})
}