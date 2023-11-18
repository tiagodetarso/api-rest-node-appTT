import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ICliente } from '../../database/models'

interface IBodyProps extends Omit<ICliente, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idCity: yup.number().min(3).moreThan(0).required(),
        idPublicPlace: yup.number().moreThan(0).required(),
        name: yup.string().min(3).max(75).required(),
        lastName: yup.string().min(3).max(75).required(),
        email: yup.string().email().min(8).required(),
        phoneNumber: yup.string().optional(),
        whatsappNumber: yup.string().min(10).required(),
        registrationDate: yup.date().required(),
        password: yup.string().min(6).max(12).required(),
        genderId: yup.string().required(),
        dateOfBirth: yup.date().required(),
        CPFNumber: yup.number().min(11).required(),
    })),
}))

export const create = (req: Request<{},{},ICliente>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Cliente cadastrado!')
}