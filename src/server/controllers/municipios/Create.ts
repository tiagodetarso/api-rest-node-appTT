import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IMunicipio } from '../../database/models'


interface IBodyProps extends Omit<IMunicipio, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().min(3).required(),
        state: yup.string().length(2).required()
    }))
}))

export const create = (req: Request<{},{},IMunicipio>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Município cadastrado!', content: createdID})
}