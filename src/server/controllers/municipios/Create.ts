import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { MunicipiosProvider } from '../../database/providers/municipios'
import { validation } from '../../shared/middlewares'
import { IMunicipio } from '../../database/models'


interface IBodyProps extends Omit<IMunicipio, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().min(3).required(),
        state: yup.string().length(2).required()
    }))
}))

export const create = async (req: Request<{},{},IMunicipio>, res: Response) => {

    const result = await MunicipiosProvider.create(req.body)
    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({msg: 'Município cadastrado!', content: result})
}