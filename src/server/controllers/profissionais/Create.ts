import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IProfissional } from '../../database/models'


interface IBodyProps extends Omit<IProfissional, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPessoa: yup.number().moreThan(0).required(),
        idProfessionalTitle: yup.number().moreThan(0).required(),
        isActive: yup.boolean().required(),
    }))
}))

export const create = (req: Request<{},{},IProfissional>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Profissional Cadastrado!', content: createdID})
}