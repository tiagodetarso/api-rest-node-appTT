import { Request, Response } from 'express'
import * as yup from 'yup'

import { ClientesProvider } from '../../database/providers/clientes'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdPessoa?: yup.Maybe<number | undefined>
    filterDateOfBirth?: yup.Maybe<Date | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterIdPessoa: yup.number().notRequired().integer(),
    filterDateOfBirth: yup.date().notRequired().default(new Date(1983, 6, 16))
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await ClientesProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterIdPessoa || 0, req.query.filterDateOfBirth || new Date(1983, 6, 16), Number(req.query.id))
    const count = await ClientesProvider.count(<number>req.query.filterIdPessoa, <Date>req.query.filterDateOfBirth)

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