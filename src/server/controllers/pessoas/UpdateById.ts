import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { PessoasProvider } from '../../database/providers/pessoas'
import { validation } from '../../shared/middlewares'
import { IPessoa } from '../../database/models'

interface IParamProps {
    id?: yup.Maybe<number | undefined>
}

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPublicPlace: yup.number().moreThan(0).required(),
        name: yup.string().min(3).max(75).required(),
        lastName: yup.string().min(3).max(75).required(),
        email: yup.string().email().min(8).required(),
        phoneNumber: yup.string().optional(),
        whatsappNumber: yup.string().min(10).required(),
        registrationDate: yup.date().required(),
        password: yup.string().min(6).max(12).required(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0).integer(),
    })),
}))

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const result = await PessoasProvider.updateById(req.params.id, req.body)
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json({msg: 'Registro atualizado com sucesso!'})
}