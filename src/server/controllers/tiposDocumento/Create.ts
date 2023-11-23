import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { ITipoDocumento } from '../../database/models'


interface IBodyProps extends Omit<ITipoDocumento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        documentName: yup.string().min(3).required(),
    }))
}))

export const create = (req: Request<{},{},ITipoDocumento>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Tipo de documento cadastrado!')
}