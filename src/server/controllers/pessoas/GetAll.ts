import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

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

    console.log(req.query)

    return res.status(StatusCodes.OK).send('Ok')
}