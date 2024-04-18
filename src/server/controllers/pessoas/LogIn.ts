import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { JWTService, PasswordCrypto } from '../../shared/services'
import { PessoasProvider } from '../../database/providers/pessoas'
import { validation } from '../../shared/middlewares'
import { IPessoa } from '../../database/models'

interface IBodyProps extends Pick<IPessoa, 'email' | 'password'> {}

export const logInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().min(8).required(),
        password: yup.string().min(6).max(12).required(),
    }))
}))

export const logIn = async (req: Request<{},{},IPessoa>, res: Response) => {

    const { email, password } = req.body

    const pessoa = await PessoasProvider.getByEmail(email)
    if (pessoa instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        })
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(password, pessoa.password)
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        })
    } else {

        const accessToken = JWTService.logIn({uid: pessoa.id})
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar token de autenticação de acesso'
                }
            })
        }

        return res.status(StatusCodes.OK).json({accessToken: accessToken})

    }
}