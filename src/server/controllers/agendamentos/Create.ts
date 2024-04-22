import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IAgendamento } from '../../database/models'
import { AgendamentosProvider } from '../../database/providers/agendamentos'

interface IBodyProps extends Omit<IAgendamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idClient: yup.number().moreThan(0).integer().required(),
        idHorario: yup.number().moreThan(0).integer().required(),
        idServicoPrestado: yup.number().moreThan(0).integer().required(),
        idStatus: yup.number().moreThan(0).integer().required(),
        idPaymentStatus: yup.number().moreThan(0).integer().required(),
        professionalAvaliation: yup.number().moreThan(-1).lessThan(6).integer().required(),
    }))
}))

export const create = async (req: Request<{},{},IAgendamento>, res: Response) => {

    const result = await AgendamentosProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg:'Agendamento realizado!', content: result})
}