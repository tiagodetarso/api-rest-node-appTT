import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { ProfissionaisProvider } from '../../database/providers/profissionais'
import { validation } from '../../shared/middlewares'
import { IProfissional } from '../../database/models'


interface IBodyProps extends Omit<IProfissional, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPessoa: yup.number().moreThan(0).required(),
        idProfessionalTitle: yup.number().moreThan(0).required(),
        isActive: yup.boolean().required(),
    }))
}))

export const create = async (req: Request<{},{},IProfissional>, res: Response) => {

    const result = await ProfissionaisProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Profissional Cadastrado!', content: result})
}