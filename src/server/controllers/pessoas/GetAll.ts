import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { validation } from '../../shared/middlewares'
import { PessoasProvider } from '../../database/providers/pessoas'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterName?: yup.Maybe<string | undefined>
    filterLastName?: yup.Maybe<string | undefined>
    filterEmail?: yup.Maybe<string | undefined>
    filterPhoneNumber?: yup.Maybe<string | undefined>
    filterWhatsappNumber?: yup.Maybe<string | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterName: yup.string().notRequired().min(3),
    filterLastName: yup.string().notRequired().min(3),
    filterEmail: yup.string().notRequired().min(3),
    filterPhoneNumber: yup.string().notRequired().min(3),
    filterWhatsappNumber: yup.string().notRequired().min(3)
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const result = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filterName || '', req.query.filterLastName || '', req.query.filterEmail || '', req.query.filterPhoneNumber || '', req.query.filterWhatsappNumber || '', Number(req.query.id))
    const count = await PessoasProvider.count(<string>req.query.filterName, <string>req.query.filterLastName, <string>req.query.filterEmail, <string>req.query.filterPhoneNumber, <string>req.query.filterWhatsappNumber)

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