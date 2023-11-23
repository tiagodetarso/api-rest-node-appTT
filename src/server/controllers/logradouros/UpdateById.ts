import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { validation } from '../../shared/middlewares'
import { ILogradouro } from '../../database/models'

interface IParamProps {
    id?: yup.Maybe<number | undefined>
}

interface IBodyProps extends Omit<ILogradouro, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idCity: yup.number().moreThan(0).required(),
        idPlaceType: yup.number().moreThan(0).required(),
        name: yup.string().min(3).required(),
        number: yup.number().moreThan(0).required(),
        neighborhood: yup.string().min(3).optional()
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