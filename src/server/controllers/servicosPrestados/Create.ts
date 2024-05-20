import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { ServicosPrestadosProvider } from '../../database/providers/servicosPrestados'
import { validation } from '../../shared/middlewares'
import { IServicoPrestado } from '../../database/models'


interface IBodyProps extends Omit<IServicoPrestado, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idServico: yup.number().moreThan(0).integer().required(),
        idProfessional: yup.number().moreThan(0).integer().required(),
        specificDescription: yup.string().min(5).max(200).optional(),
        price: yup.number().required().min(0),
    }))
}))

export const create = async (req: Request<{},{},IServicoPrestado>, res: Response) => {

    const result = await ServicosPrestadosProvider.create(req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Serviço prestado cadastrado!', content: result})
}