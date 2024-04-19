import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

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

    console.log(req.query)

    return res.status(StatusCodes.OK).send('Ok')
}