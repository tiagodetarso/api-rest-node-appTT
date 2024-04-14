import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IAgendamento } from '../../database/models'

interface IBodyProps extends Omit<IAgendamento, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idProfessional: yup.number().moreThan(0).integer().required(),
        idClient: yup.number().moreThan(0).integer().required(),
        idHorario: yup.number().moreThan(0).integer().required(),
        idServicoPrestado: yup.number().moreThan(0).integer().required(),
        idStatus: yup.number().moreThan(0).integer().required(),
        idPaymentStatus: yup.number().moreThan(0).integer().required(),
        professionalAvaliation: yup.number().moreThan(-1).lessThan(6).integer().required(),
    }))
}))

export const create = (req: Request<{},{},IAgendamento>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg:'Pessoa cadastrado!', content: createdID})
}