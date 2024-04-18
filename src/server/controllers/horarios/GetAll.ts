import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface IQueryProps {
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filterIdProfessional?: yup.Maybe<number | undefined>
    filterSchedulingTime?: yup.Maybe<Date | undefined>
    filterIsAvaiable?: yup.Maybe<boolean | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    id: yup.number().integer().notRequired().default(0),
    filterIdProfessional: yup.number().notRequired().moreThan(0).integer(),
    filterSchedulingTime: yup.date().notRequired().default(new Date(1983,6,16)),
    filterIsAvaiable: yup.boolean()
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    console.log(req.query)

    return res.status(StatusCodes.OK).send('Ok')
}