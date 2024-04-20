import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { StatusAgendamentoProvider } from '../../database/providers/statusAgendamentos'
import { validation } from '../../shared/middlewares'
import { IStatusAgendamento } from '../../database/models'


interface IBodyProps extends Omit<IStatusAgendamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        status: yup.string().min(3).required(),
    }))
}))

export const create = async (req: Request<{},{},IStatusAgendamento>, res: Response) => {

    const result = await StatusAgendamentoProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Status de agendamento cadastrado!', content: result})
}