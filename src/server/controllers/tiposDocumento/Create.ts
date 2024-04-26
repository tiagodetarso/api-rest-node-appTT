import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { TiposDocumentoProvider } from '../../database/providers/tiposDocumento'
import { validation } from '../../shared/middlewares'
import { ITipoDocumento } from '../../database/models'


interface IBodyProps extends Omit<ITipoDocumento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        documentName: yup.string().min(3).max(50).required(),
    }))
}))

export const create = async (req: Request<{},{},ITipoDocumento>, res: Response) => {

    const result = await TiposDocumentoProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    
    return res.status(StatusCodes.CREATED).json({msg: 'Tipo de documento cadastrado!', content: result})
}