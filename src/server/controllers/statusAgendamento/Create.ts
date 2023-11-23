import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IStatusAgendamento } from '../../database/models'


interface IBodyProps extends Omit<IStatusAgendamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        status: yup.string().min(3).required(),
    }))
}))

export const create = (req: Request<{},{},IStatusAgendamento>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).send('Status de agendamento cadastrado!')
}