import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IPessoa } from '../../database/models'

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPublicPlace: yup.number().moreThan(0).required(),
        name: yup.string().min(3).max(75).required(),
        lastName: yup.string().min(3).max(75).required(),
        email: yup.string().email().min(8).required(),
        phoneNumber: yup.string().optional(),
        whatsappNumber: yup.string().min(10).required(),
        registrationDate: yup.date().required(),
        password: yup.string().min(6).max(12).required(),
    }))
}))

export const create = (req: Request<{},{},IPessoa>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Pessoa cadastrado!')
}