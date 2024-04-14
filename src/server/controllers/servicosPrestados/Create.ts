import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IServicoPrestado } from '../../database/models'


interface IBodyProps extends Omit<IServicoPrestado, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idServico: yup.number().moreThan(0).integer().required(),
        idProfessional: yup.number().moreThan(0).integer().required(),
        specificDescription: yup.string().min(5).max(200).optional(),
        price: yup.number().moreThan(0).required(),
    }))
}))

export const create = (req: Request<{},{},IServicoPrestado>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Serviço prestado cadastrado!', content: createdID})
}