import { Request, Response } from 'express'
import * as yup from 'yup'

import { ServicosProvider } from '../../database/providers/servicos'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'


interface IParamProps {
    id?: number | undefined
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0).integer(),
    })),
}))

export const getById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    const result = await ServicosProvider.getById(req.params.id)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                defatul: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json(result)
}