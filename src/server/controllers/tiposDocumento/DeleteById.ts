import { Request, Response } from 'express'
import * as yup from 'yup'

import { TiposDocumentoProvider } from '../../database/providers/tiposDocumento'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface IParamProps {
    id?: number | undefined
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0).integer(),
    })),
}))

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const result = await TiposDocumentoProvider.deleteById(req.params.id)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json({msg: 'Registro apagado com sucesso!'})
}