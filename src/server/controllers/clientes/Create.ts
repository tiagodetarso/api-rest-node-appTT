import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ICliente } from '../../database/models'

interface IBodyProps extends Omit<ICliente, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPessoa: yup.number().moreThan(0).required(),
        genderId: yup.string().required(),
        dateOfBirth: yup.date().required(),
    }))
}))

export const create = (req: Request<{},{},ICliente>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Cliente cadastrado!')
}