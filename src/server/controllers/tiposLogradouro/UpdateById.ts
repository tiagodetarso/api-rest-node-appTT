import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { validation } from '../../shared/middlewares'
import { ITipoLogradouro } from '../../database/models'

interface IParamProps {
    id?: yup.Maybe<number | undefined>
}

interface IBodyProps extends Omit<ITipoLogradouro, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        type: yup.string().min(3).required(),
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

    return res.status(StatusCodes.NO_CONTENT).send()
}