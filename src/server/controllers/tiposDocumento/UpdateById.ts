import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { TiposDocumentoProvider } from '../../database/providers/tiposDocumento'
import { validation } from '../../shared/middlewares'
import { ITipoDocumento } from '../../database/models'

interface IParamProps {
    id?: yup.Maybe<number | undefined>
}

interface IBodyProps extends Omit<ITipoDocumento, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        documentName: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0).integer(),
    })),
}))

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const result = await TiposDocumentoProvider.updateById(req.params.id, req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json({msg: 'Registro Atualizado com sucesso!'})
}