import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { AgendamentosProvider } from '../../database/providers/agendamentos'
import { validation } from '../../shared/middlewares'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdProfessional?: yup.Maybe<number | undefined>
    filterIdClient?: yup.Maybe<number | undefined>
    filterIdHorario?: yup.Maybe<number | undefined>
    filterIdStatus?: yup.Maybe<number | undefined>
    filterIdPaymentStatus?: yup.Maybe<number | undefined>
}

const querySchema = yup.object().shape({
    id: yup.number().integer().notRequired().moreThan(0),
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    filterIdProfessional: yup.number().notRequired().moreThan(0).integer(),
    filterIdClient: yup.number().notRequired().moreThan(0).integer(),
    filterIdHorario: yup.number().notRequired().moreThan(0).integer(),
    filterIdStatus: yup.number().notRequired().moreThan(0).integer(),
    filterIdPaymentStatus: yup.number().notRequired().moreThan(0).integer()
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await AgendamentosProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterIdProfessional || 0, req.query.filterIdClient || 0, req.query.filterIdHorario || 0, req.query.filterIdStatus || 0, req.query.filterIdPaymentStatus || 0, Number(req.query.id))
    const count = await AgendamentosProvider.count(<number>req.query.filterIdProfessional, <number>req.query.filterIdClient, <number>req.query.filterIdHorario, <number>req.query.filterIdStatus, <number>req.query.filterIdPaymentStatus)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', count)

    return res.status(StatusCodes.OK).json(result)
}