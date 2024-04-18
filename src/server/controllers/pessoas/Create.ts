import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { PasswordCrypto } from '../../shared/services'
import { PessoasProvider } from '../../database/providers/pessoas'
import { validation } from '../../shared/middlewares'
import { IPessoa } from '../../database/models'

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idPublicPlace: yup.number().moreThan(0).required(),
        name: yup.string().min(3).max(75).required(),
        lastName: yup.string().min(3).max(75).required(),
        email: yup.string().email().min(8).required(),
        phoneNumber: yup.string().optional(),
        whatsappNumber: yup.string().min(10).required(),
        registrationDate: yup.date().required(),
        password: yup.string().min(6).max(12).required(),
    }))
}))

export const create = async (req: Request<{},{},IPessoa>, res: Response) => {

    const hashedPassword = PasswordCrypto.hashPassword(req.body.password)
    if (hashedPassword instanceof Error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: {
                default: 'Não foi possível criptografar a senha'
            }
        })
    }

    req.body.password = await hashedPassword

    const result = await PessoasProvider.create(req.body)
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    
    return res.status(StatusCodes.CREATED).json({msg: 'Pessoa cadastrada!', content: result})
}