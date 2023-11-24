import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ILogradouro } from '../../database/models'

interface IBodyProps extends Omit<ILogradouro, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idCity: yup.number().moreThan(0).required(),
        idPlaceType: yup.number().moreThan(0).required(),
        name: yup.string().min(3).required(),
        number: yup.number().moreThan(0).required(),
        neighborhood: yup.string().min(3).optional()
    }))
}))

export const create = (req: Request<{},{},ILogradouro>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Logradouro cadastrado!', content: createdID})
}