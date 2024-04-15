import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
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

export const create = (req: Request<{},{},IEndereco>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Endereco cadastrado!', content: createdID})
}