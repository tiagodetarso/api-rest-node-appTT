import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

import { IPessoa } from '../../database/models'

interface IBodyProps extends Pick<IPessoa, 'email' | 'password'> {}

export const logInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().min(8).required(),
        password: yup.string().min(6).max(12).required(),
    }))
}))

export const logIn = (req: Request<{},{},IPessoa>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.NO_CONTENT).send()
}