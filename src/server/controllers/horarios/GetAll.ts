import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { HorariosProvider } from '../../database/providers/horarios'
import { validation } from '../../shared/middlewares'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdProfessional?: yup.Maybe<number | undefined>
    filterSchedulingTime?: yup.Maybe<number | undefined>
    filterIsAvaiable?: yup.Maybe<boolean | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterIdProfessional: yup.number().notRequired().moreThan(0).integer(),
    filterSchedulingTime: yup.number().integer().moreThan(0).notRequired(),
    filterIsAvaiable: yup.boolean()
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await HorariosProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterIdProfessional || 0, req.query.filterSchedulingTime || 0, req.query.filterIsAvaiable || true, Number(req.query.id))
    const count = await HorariosProvider.count(<number>req.query.filterIdProfessional, <number>req.query.filterSchedulingTime, <boolean>req.query.filterIsAvaiable)

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