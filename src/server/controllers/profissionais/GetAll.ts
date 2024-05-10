import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { ProfissionaisProvider } from '../../database/providers/profissionais'
import { validation } from '../../shared/middlewares'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdPessoa?: yup.Maybe<number | undefined>
    filterIdProfessionalTitle?: yup.Maybe<number | undefined>
    filterServiceAddress?: yup.Maybe<number | undefined>
    filterIsActive?: yup.Maybe<boolean | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterIdPessoa: yup.number().notRequired().moreThan(0).integer(),
    filterIdProfessionalTitle: yup.number().notRequired().moreThan(0).integer(),
    filterServiceAddress: yup.number().notRequired().moreThan(0).integer(),
    filterIsActive: yup.boolean().notRequired()
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await ProfissionaisProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterIdPessoa || 0, req.query.filterIdProfessionalTitle || 0, req.query.filterServiceAddress || 0, req.query.filterIsActive || true, Number(req.query.id))
    const count = await ProfissionaisProvider.count(<number>req.query.filterIdPessoa, <number>req.query.filterIdProfessionalTitle, <number>req.query.filterServiceAddress, <boolean>req.query.filterIsActive)

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
