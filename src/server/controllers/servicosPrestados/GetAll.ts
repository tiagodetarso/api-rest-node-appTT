import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { ServicosPrestadosProvider } from '../../database/providers/servicosPrestados'
import { validation } from '../../shared/middlewares'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdServico?: yup.Maybe<number | undefined>
    filterIdProfessional?: yup.Maybe<number | undefined>
    filterLowerPrice?: yup.Maybe<number | undefined>
    filterHigherPrice?: yup.Maybe<number | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterIdServico: yup.number().notRequired().integer().moreThan(0),
    filterIdProfessional: yup.number().notRequired().integer().moreThan(0),
    filterLowerPrice: yup.number().notRequired().integer(),
    filterHigherPrice: yup.number().notRequired().integer()
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await ServicosPrestadosProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterIdServico || 0, req.query.filterIdProfessional || 0, req.query.filterLowerPrice || 0, req.query.filterHigherPrice || 5000, Number(req.query.id))
    const count = await ServicosPrestadosProvider.count(<number>req.query.filterIdServico, <number>req.query.filterIdProfessional, <number>req.query.filterLowerPrice, <number>req.query.filterHigherPrice)

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