import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { validation } from '../../shared/middlewares'
import { IHorario } from '../../database/models'
import { HorariosProvider } from '../../database/providers/horarios/index'


interface IBodyProps extends Omit<IHorario, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idProfessional: yup.number().moreThan(0).integer().required(),
        schedulingTime: yup.number().integer().moreThan(0).required(),
        isAvaiable: yup.boolean().required(),
    }))
}))

export const create = async (req: Request<{},{},IHorario>, res: Response) => {

    const result = await HorariosProvider.create(req.body)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Horário disponibilizado!', content: result})
}