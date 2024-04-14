import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IHorario } from '../../database/models'


interface IBodyProps extends Omit<IHorario, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idProfessional: yup.number().moreThan(0).integer().required(),
        schedulingTime: yup.date().required(),
        isAvaiable: yup.boolean().required(),
    }))
}))

export const create = (req: Request<{},{},IHorario>, res: Response) => {

    console.log(req.body)

    const createdID = 1

    return res.status(StatusCodes.CREATED).json({msg: 'Município cadastrado!', content: createdID})
}